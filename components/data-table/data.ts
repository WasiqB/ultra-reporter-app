import {
  AreaChartData,
  ChartData,
  FormattedData,
  TestException,
  TestLog,
  TestResult,
} from '@/types/types';
import { AlertTriangle, Check, X } from 'lucide-react';
import { format } from 'date-fns';
import { formatDateTime, round, toDuration } from '@/lib/formatting';
import { formatDuration } from '../../lib/formatting';

export type TestResultData = {
  run_date: string;
  suite_name: string;
  test_name: string;
  class_name: string;
  method_name: string;
  is_config: boolean;
  tags: string[];
  parameters: string[];
  status: string;
  exception?: TestException;
  attachment?: TestLog;
  started_at: string;
  finished_at: string;
  duration_ms: string;
};

export const getData = (data: TestResult): TestResultData[] => {
  const result: TestResultData[] = [];
  const suites = data.test_suites;
  for (const suite of suites) {
    for (const test of suite.test_cases) {
      for (const cls of test.test_classes) {
        for (const method of cls.test_methods) {
          result.push({
            run_date: formatDateTime(method.started_at).date,
            suite_name: suite.name,
            test_name: test.name,
            class_name: cls.name?.substring(cls.name.lastIndexOf('.') + 1),
            method_name: method.description || method.name,
            is_config: method.is_config,
            tags: method.tags || [],
            parameters: method.parameters || [],
            status: method.status.toLowerCase(),
            exception: method.exception,
            attachment: method.log,
            started_at: formatDateTime(method.started_at).time,
            finished_at: formatDateTime(method.finished_at).time,
            duration_ms: formatDuration(method.duration_ms),
          });
        }
      }
    }
  }
  return result;
};

export const statuses = [
  {
    value: 'pass',
    label: 'Passed',
    icon: Check,
    badge_style: 'bg-green-100 hover:bg-green-300 text-green-800',
    label_style: 'text-green-500',
  },
  {
    value: 'fail',
    label: 'Failed',
    icon: X,
    badge_style: 'bg-red-100 hover:bg-red-300 text-red-800',
    label_style: 'text-red-500',
  },
  {
    value: 'skip',
    label: 'Skipped',
    icon: AlertTriangle,
    badge_style: 'bg-yellow-100 hover:bg-yellow-300 text-yellow-800',
    label_style: 'text-yellow-500',
  },
];

export const getFormattedData = (data: TestResultData[]): FormattedData => {
  const statusCounts = {
    pass: 0,
    fail: 0,
    skip: 0,
    ignored: 0,
  };

  data.forEach((item) => {
    if (item.status in statusCounts) {
      statusCounts[item.status as keyof typeof statusCounts]++;
    }
  });

  const totalTests = data.length;
  const { pass: passed, fail: failed, skip: skipped, ignored } = statusCounts;

  const calculatePercentage = (count: number): number =>
    round((count / totalTests) * 100);

  const chartCountData: ChartData[] = [
    { status: 'pass', fill: 'var(--color-pass)', total: passed },
    { status: 'fail', fill: 'var(--color-fail)', total: failed },
    { status: 'skip', fill: 'var(--color-skip)', total: skipped },
  ];

  const chartPieData: ChartData[] = [
    {
      status: 'pass',
      total: calculatePercentage(passed),
      fill: 'var(--color-pass)',
    },
    {
      status: 'fail',
      total: calculatePercentage(failed),
      fill: 'var(--color-fail)',
    },
    {
      status: 'skip',
      total: calculatePercentage(skipped),
      fill: 'var(--color-skip)',
    },
  ];

  const areaChartData: AreaChartData[] = data.map((r) => {
    return {
      property: `${r.class_name} / ${r.method_name}`,
      value: toDuration(r.duration_ms),
    };
  });

  const date =
    data.length > 0 ? format(data[0].run_date, 'MMMM d, yyyy') : 'N/A';

  return {
    passed,
    failed,
    skipped,
    ignored,
    date,
    totalTests,
    chartCountData,
    chartPieData,
    areaChartData,
  };
};
