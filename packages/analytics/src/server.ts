import { OpenPanel, type PostEventPayload } from '@openpanel/nextjs';
import { logger } from '@ultra-reporter/logger';
import { isProd } from '@ultra-reporter/utils/constants';
import { waitUntil } from '@vercel/functions';

type Props = {
  userId?: string;
  fullName?: string | null;
};

export const setupAnalytics = async (options?: Props) => {
  const { userId, fullName } = options ?? {};

  const client = new OpenPanel({
    clientId: process.env.NEXT_PUBLIC_OPENPANEL_CLIENT_ID!,
    clientSecret: process.env.OPENPANEL_SECRET_KEY!,
  });

  if (userId && fullName) {
    const [firstName, lastName] = fullName.split(' ');

    waitUntil(
      client.identify({
        profileId: userId,
        firstName,
        lastName,
      })
    );
  }

  return {
    track: (options: { event: string } & PostEventPayload['properties']) => {
      if (!isProd) {
        logger.info('Track', options);
        return;
      }

      const { event, ...rest } = options;
      waitUntil(client.track(event, rest));
    },
  };
};
