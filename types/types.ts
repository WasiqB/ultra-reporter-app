type TestResult = {
  test_suites: TestSuite[];
  total: number;
  passed: number;
  failed: number;
  skipped: number;
  ignored: number;
};

type TestSuite = {
  name: string;
  started_at: string;
  finished_at: string;
  duration_ms: number;
  total?: number;
  passed?: number;
  failed?: number;
  skipped?: number;
  ignored?: number;
  test_cases: TestCase[];
};

type TestCase = {
  name: string;
  started_at: string;
  finished_at: string;
  duration_ms: number;
  total?: number;
  passed?: number;
  failed?: number;
  skipped?: number;
  ignored?: number;
  test_classes: TestClass[];
};

type TestClass = {
  name: string;
  total?: number;
  passed?: number;
  failed?: number;
  skipped?: number;
  ignored?: number;
  test_methods: TestMethod[];
};

type TestMethod = {
  id: number;
  name: string;
  description?: string;
  is_config: boolean;
  started_at: string;
  finished_at: string;
  duration_ms: number;
  tags?: string[];
  parameters?: string[];
  status: TestStatus;
  exception?: TestException;
  log: TestLog;
};

type TestLog = {
  line: string;
};

type TestException = {
  class_name: string;
  message: string;
  stack_trace: string[];
};

enum TestStatus {
  pass = 'PASS',
  fail = 'FAIL',
  skip = 'SKIP',
  ignore = 'IGNORE',
}

type ChartData = {
  status: 'pass' | 'fail' | 'skip';
  total: number;
  fill: string;
};

type FormattedData = {
  passed: number;
  failed: number;
  skipped: number;
  ignored: number;
  date: string;
  totalTests: number;
  chartCountData: ChartData[];
  chartPieData: ChartData[];
};

export type {
  TestResult,
  TestSuite,
  TestCase,
  TestClass,
  TestMethod,
  TestException,
  TestLog,
  TestStatus,
  ChartData,
  FormattedData,
};
