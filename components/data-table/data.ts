import { TestException, TestLog, TestResult } from '@/types/types';
import { AlertTriangle, Check, X } from 'lucide-react';

export type TestResultData = {
  suite_name: string;
  test_name: string;
  class_name: string;
  method_name: string;
  is_config: boolean;
  tags: string[];
  params: string[];
  status: string;
  exception?: TestException;
  attachment?: TestLog;
  started_at: string;
  finished_at: string;
  duration_ms: number;
};

export const getData = (data: TestResult): TestResultData[] => {
  const result: TestResultData[] = [];
  const suites = data.test_suites;
  for (const suite of suites) {
    for (const test of suite.test_cases) {
      for (const cls of test.test_classes) {
        for (const method of cls.test_methods) {
          result.push({
            suite_name: suite.name,
            test_name: test.name,
            class_name: cls.name?.substring(cls.name.lastIndexOf('.')),
            method_name: method.description || method.name,
            is_config: method.is_config,
            tags: method.tags || [],
            params: method.params || [],
            status: method.status.toLowerCase(),
            exception: method.exception,
            attachment: method.log,
            started_at: method.started_at,
            finished_at: method.finished_at,
            duration_ms: method.duration_ms,
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
