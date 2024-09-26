import { parse, format } from 'date-fns';

export const formatDuration = (duration: number): string =>
  duration >= 1000 ? `${(duration / 1000).toFixed(2)} s` : `${duration} ms`;

export const formatTime = (dateTime: string): string => {
  const cleanedDateString = dateTime.replace('AST', 'UTC');
  const parsedDate = parse(
    cleanedDateString,
    /* eslint-disable @stylistic/ts/quotes */
    "yyyy-MM-dd'T'HH:mm:ss 'UTC'",
    new Date()
  );
  const formattedTime = format(parsedDate, 'hh:mm:ss bb');

  return formattedTime;
};
