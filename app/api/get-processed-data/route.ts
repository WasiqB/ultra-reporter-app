import { Redis } from '@upstash/redis';
import { TestResultData } from '@/components/data-table/data';
import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export async function GET(req: Request): Promise<NextResponse<unknown>> {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return new NextResponse(
      'The user does not have an active session or is not authenticated',
      { status: 401 }
    );
  }

  const { sessionId } = await req.json();

  if (!sessionId || typeof sessionId !== 'string') {
    return new NextResponse('Invalid session ID', { status: 400 });
  }

  const processedData: TestResultData[] | null = await redis.get(sessionId);

  if (!processedData) {
    return new NextResponse('Processed data not found', { status: 404 });
  }

  return NextResponse.json(processedData);
}
