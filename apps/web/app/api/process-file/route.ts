import { getData } from '@ultra-reporter/ui/data';
import {
  convertToJson,
  getTestResults,
} from '@ultra-reporter/utils/xml-parser';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    if (!file.name.endsWith('.xml')) {
      return NextResponse.json(
        { error: 'Invalid file type. Only XML files are allowed.' },
        { status: 400 }
      );
    }

    const xmlContent = await file.text();
    if (!xmlContent) {
      return NextResponse.json(
        { error: 'Empty file content' },
        { status: 400 }
      );
    }

    const jsonData = convertToJson(xmlContent);
    const testResult = getTestResults(jsonData);
    const processedData = getData(testResult);

    // Create the response first
    const response = NextResponse.json({ success: true });

    // Set cookie in the response
    response.cookies.set('test-results', JSON.stringify(processedData), {
      path: '/',
      maxAge: 3600,
      httpOnly: false, // Set to false so client-side can access it
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });

    return response;
  } catch (error) {
    console.error('Error processing file:', error);
    return NextResponse.json(
      { error: 'Error processing file' },
      { status: 500 }
    );
  }
}
