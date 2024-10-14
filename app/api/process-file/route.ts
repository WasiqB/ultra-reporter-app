import { Redis } from '@upstash/redis';
import { convertToJson, getTestResults } from '@/lib/xml-parser';
import { getData, TestResultData } from '@/components/data-table/data';
import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export async function POST(req: Request): Promise<NextResponse<unknown>> {
  const { content } = await req.json();
  const supabase = createRouteHandlerClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let processedData: TestResultData[];
  try {
    const jsonData = convertToJson(content);
    const testResult = getTestResults(jsonData);
    processedData = getData(testResult);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return new NextResponse('Error processing file', { status: 500 });
  }

  await redis.set(session.access_token, JSON.stringify(processedData), {
    ex: 3600,
  });

  return NextResponse.json({
    status: 200,
    message: 'File processed successfully',
    session_id: session.access_token,
  });
}
