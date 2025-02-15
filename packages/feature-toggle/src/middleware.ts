'use server';

import flagsmith from 'flagsmith/next-middleware';

export async function getFlag(flagId: string): Promise<boolean> {
  await flagsmith.init({
    environmentID: process.env.NEXT_PUBLIC_FLAGSMITH_ENVIRONMENT_ID,
  });

  return flagsmith.hasFeature(flagId);
}
