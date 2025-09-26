import { auth } from '@ultra-reporter/auth/auth';
import { db } from '@ultra-reporter/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    const resolvedParams = await params;
    const session = await auth.api.getSession({ headers: request.headers });

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const testReport = await db.testReport.findFirst({
      where: {
        id: resolvedParams.id,
        userId: session.user.id,
      },
    });

    if (!testReport) {
      return NextResponse.json({ error: 'Report not found' }, { status: 404 });
    }

    return NextResponse.json({
      id: testReport.id,
      status: testReport.status,
      fileName: testReport.fileName,
      jsonData: testReport.jsonData ? JSON.parse(testReport.jsonData) : null,
      errorMessage: testReport.errorMessage,
      createdAt: testReport.createdAt,
    });
  } catch (error) {
    console.error('Report fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch report' },
      { status: 500 }
    );
  }
}
