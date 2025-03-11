import { logger } from '@ultra-reporter/logger';
import { db } from '../client';

interface LoginDetail {
  userId: string;
  ip?: string;
}

const createLoginDetail = async ({ userId, ip }: LoginDetail) => {
  await db.loginDetails.create({
    data: {
      userId,
      lastIp: ip || '',
    },
  });
};

const updateLogoutDate = async ({ userId }: LoginDetail) => {
  const latestLogin = await db.loginDetails.findFirst({
    where: { userId },
    orderBy: { lastLogin: 'desc' },
  });

  if (latestLogin) {
    await db.loginDetails.update({
      where: { id: latestLogin.id },
      data: { lastLogout: new Date() },
    });

    logger.debug(`Logout time recorded for login record ${latestLogin.id}`);
  } else {
    logger.warn(`No login record found for user ${userId} when logging out`);
  }
};

export { createLoginDetail, updateLogoutDate };
