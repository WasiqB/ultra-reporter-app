import { TestResultData } from '@ultra-reporter/ui/data';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const testResults = cookieStore.get('test-results');

    if (!testResults?.value) {
      return NextResponse.json(
        { error: 'Please upload a file first' },
        { status: 404 }
      );
    }

    let data: TestResultData[];
    try {
      data = JSON.parse(testResults.value) as TestResultData[];
    } catch (parseError) {
      console.error('Parse error:', parseError);
      return NextResponse.json(
        { error: 'Invalid data format in cookie' },
        { status: 400 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error getting formatted data:', error);
    return NextResponse.json(
      { error: 'Error retrieving formatted data' },
      { status: 500 }
    );
  }
}
