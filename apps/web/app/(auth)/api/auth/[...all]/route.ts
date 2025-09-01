import { auth, toNextJsHandler } from '@ultra-reporter/auth/auth';

export const { POST, GET } = toNextJsHandler(auth);
