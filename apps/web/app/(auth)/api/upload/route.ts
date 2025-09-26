import { auth } from '@ultra-reporter/auth/auth';
import { db } from '@ultra-reporter/db';
import { getData } from '@ultra-reporter/ui/data';
import {
  convertToJson,
  getTestResults,
} from '@ultra-reporter/utils/xml-parser';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const session = await auth.api.getSession({ headers: request.headers });
    let userId = session?.user?.id;

    if (!userId) {
      const anonymousUser = await auth.api.signInAnonymous();
      if (anonymousUser) {
        userId = anonymousUser.user?.id;
      }
    }

    if (!userId) {
      return NextResponse.json(
        { error: 'Failed to create user session' },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    if (!file.name.endsWith('.xml')) {
      return NextResponse.json(
        { error: 'Only XML files are allowed' },
        { status: 400 }
      );
    }

    const xmlContent = await file.text();

    const testReport = await db.testReport.create({
      data: {
        userId,
        fileName: file.name,
        xmlContent,
        jsonData: '',
        status: 'processing',
      },
    });

    processXmlFile(testReport.id, xmlContent);

    return NextResponse.json({
      reportId: testReport.id,
      status: 'processing',
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}

async function processXmlFile(
  reportId: string,
  xmlContent: string
): Promise<void> {
  try {
    const jsonData = convertToJson(xmlContent);
    const testResult = getTestResults(jsonData);
    const processedData = getData(testResult);

    await db.testReport.update({
      where: { id: reportId },
      data: {
        jsonData: JSON.stringify(processedData),
        status: 'completed',
      },
    });
  } catch (error) {
    await db.testReport.update({
      where: { id: reportId },
      data: {
        status: 'failed',
        errorMessage:
          error instanceof Error ? error.message : 'Processing failed',
      },
    });
  }
}
