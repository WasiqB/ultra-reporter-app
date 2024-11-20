import { format, parse } from 'date-fns';
import { DateTime } from 'luxon';

export const toDuration = (duration: string): number => {
  const splitTime = duration.split(' ');
  const time = parseFloat(splitTime[0] || '0');
  const type = splitTime[1];
  const SECOND = 1;
  const MINUTE = 60 * SECOND;
  const HOUR = 60 * MINUTE;
  let result = time;

  switch (type) {
    case 'm':
      result *= MINUTE;
      break;
    case 'h':
      result *= HOUR;
      break;
    case 'ms':
      result = result / 1000;
      break;
    case 's':
    default:
      result *= SECOND;
      break;
  }

  return result;
};

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

export const formatDateTime = (
  dateTimeString: string
): {
  date: string;
  time: string;
} => {
  try {
    const systemZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const timezoneSplit = dateTimeString.split(' ');
    let adjustedDateTimeString = dateTimeString;

    if (timezoneSplit.length > 1) {
      timezoneSplit.pop();
      adjustedDateTimeString = timezoneSplit.join(' ');
    }

    let dateTime = DateTime.fromISO(adjustedDateTimeString, {
      zone: systemZone,
    });

    if (!dateTime.isValid) {
      dateTime = DateTime.fromRFC2822(adjustedDateTimeString, {
        zone: systemZone,
      });
    }

    if (!dateTime.isValid) {
      dateTime = DateTime.fromHTTP(adjustedDateTimeString, {
        zone: systemZone,
      });
    }

    if (!dateTime.isValid) {
      throw new Error('Invalid date-time format');
    }

    const formattedDate = dateTime.toFormat('yyyy-MM-dd');
    const formattedTime = dateTime.toFormat('hh:mm:ss a');

    return { date: formattedDate, time: formattedTime };
  } catch (error) {
    throw new Error(`Error parsing date: ${error}`);
  }
};

export const formatTime = (dateTime: string): string => {
  const TIME_FORMAT = 'hh:mm:ss aa';
  if (dateTime.endsWith('AST')) {
    const cleanedDateString = dateTime.replace('AST', 'UTC');
    const parsedDate = parse(
      cleanedDateString,
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
      "yyyy-MM-dd'T'HH:mm:ss 'UTC'",
      new Date()
    );
    return format(parsedDate, DATE_FORMAT);
  }
  return format(dateTime, DATE_FORMAT);
};

export const formatDateWithFormat = (
  dateTime: string,
  pattern: string
): string => {
  return format(dateTime, pattern);
};

export const round = (value: number): number => {
  return Math.round((value + Number.EPSILON) * 100) / 100;
};
