import { parse, format } from 'date-fns';

export const formatDuration = (duration: number): string => {
  const SECOND = 1000;
  const MINUTE = 60 * SECOND;
  const HOUR = 60 * MINUTE;

  return duration >= HOUR
    ? `${(duration / HOUR).toFixed(2)} h`
    : duration >= MINUTE
      ? `${(duration / MINUTE).toFixed(2)} m`
      : duration >= SECOND
        ? `${(duration / SECOND).toFixed(2)} s`
        : `${duration} ms`;
};

export const formatTime = (dateTime: string): string => {
  const TIME_FORMAT = 'hh:mm:ss bb';
  if (dateTime.endsWith('AST')) {
    const cleanedDateString = dateTime.replace('AST', 'UTC');
    const parsedDate = parse(
      cleanedDateString,
      /* eslint-disable @stylistic/ts/quotes */
      "yyyy-MM-dd'T'HH:mm:ss 'UTC'",
      new Date()
    );
    return format(parsedDate, TIME_FORMAT);
  }
  return format(dateTime, TIME_FORMAT);
};

export const formatDate = (dateTime: string): string => {
  const DATE_FORMAT = 'dd-MMM-yyyy';
  if (dateTime.endsWith('AST')) {
    const cleanedDateString = dateTime.replace('AST', 'UTC');
    const parsedDate = parse(
      cleanedDateString,
      /* eslint-disable @stylistic/ts/quotes */
      "yyyy-MM-dd'T'HH:mm:ss 'UTC'",
      new Date()
    );
    return format(parsedDate, DATE_FORMAT);
  }
  return format(dateTime, DATE_FORMAT);
};

export const round = (value: number): number => {
  return Math.round((value + Number.EPSILON) * 100) / 100;
};
