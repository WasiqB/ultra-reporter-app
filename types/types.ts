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

export type {
  TestResult,
  TestSuite,
  TestCase,
  TestClass,
  TestMethod,
  TestException,
  TestLog,
  TestStatus,
};
