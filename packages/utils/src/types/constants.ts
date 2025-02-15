const isProd = process.env.VERCEL_ENV === 'production';
const isPreview = process.env.VERCEL_ENV === 'preview';
const isDev = process.env.VERCEL_ENV === 'development';

export { isDev, isPreview, isProd };
