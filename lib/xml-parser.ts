import {
  TestCase,
  TestClass,
  TestException,
  TestLog,
  TestMethod,
  TestResult,
  TestSuite,
} from '@/types/types';
import { parseString } from 'xml2js';

const getTestException = (exception: any): TestException | undefined => {
  if (exception) {
    const result: TestException = {
      class_name: exception.class,
      message: exception.message,
      stack_trace: exception['full-stacktrace'].split('\n'),
    };
    return result;
  }
};

const getTestLog = (output: any): TestLog => {
  return output;
};

const getTags = (
  className: string,
  methodName: string,
  groups: any
): string[] => {
  const result: string[] = [];
  if (!groups) return result;

  const processGroup = (group: any): void => {
    const tag = group.name;
    const groupMethods = Array.isArray(group.method)
      ? group.method
      : [group.method];
    for (const method of groupMethods) {
      if (className === method.class && methodName === method.name) {
        result.push(tag);
      }
    }
  };

  if (Array.isArray(groups)) {
    groups.forEach(processGroup);
  } else {
    processGroup(groups);
  }

  return result;
};

const getParams = (params: any): string[] => {
  const result: string[] = [];
  if (!params) return result;

  const processParam = (param: any): void => {
    result.push(param.value.trim());
  };

  const param = params.param;
  if (Array.isArray(param)) {
    param.forEach(processParam);
  } else {
    processParam(param);
  }

  return result;
};

const getTestMethods = (
  methods: any,
  className: string,
  groups: any
): TestMethod[] => {
  const result: TestMethod[] = [];
  if (!methods) return result;

  const processMethod = (method: any, index: number = 1): void => {
    result.push({
      id: index,
      name: method.name,
      description: method.description || '',
      is_config: !!method['is-config'],
      started_at: method['started-at'],
      finished_at: method['finished-at'],
      duration_ms: method['duration-ms'],
      tags: getTags(className, method.name, groups),
      parameters: getParams(method.params),
      status: method.status,
      exception: getTestException(method.exception),
      log: getTestLog(method['reporter-output']),
    });
  };

  if (Array.isArray(methods)) {
    methods.forEach(processMethod);
  } else {
    processMethod(methods);
  }

  return result;
};

const getTestClasses = (classes: any, groups: any): TestClass[] => {
  const result: TestClass[] = [];
  if (!classes) return result;

  const processClass = (cls: any): void => {
    result.push({
      name: cls.name,
      test_methods: getTestMethods(cls['test-method'], cls.name, groups),
    });
  };

  if (Array.isArray(classes)) {
    classes.forEach(processClass);
  } else {
    processClass(classes);
  }

  return result;
};

const getTestCases = (tests: any, groups: any): TestCase[] => {
  const result: TestCase[] = [];
  if (!tests) return result;

  const processTest = (test: any): void => {
    result.push({
      name: test.name,
      started_at: test['started-at'],
      finished_at: test['finished-at'],
      duration_ms: test['duration-ms'],
      test_classes: getTestClasses(test.class, groups),
    });
  };

  if (Array.isArray(tests)) {
    tests.forEach(processTest);
  } else {
    processTest(tests);
  }

  return result;
};

const getTestSuites = (suites: any): TestSuite[] => {
  const result: TestSuite[] = [];
  if (!suites) return result;

  const processSuite = (suite: any): void => {
    result.push({
      name: suite.name,
      started_at: suite['started-at'],
      finished_at: suite['finished-at'],
      duration_ms: parseInt(suite['duration-ms']),
      test_cases: getTestCases(suite.test, suites.groups?.group),
    });
  };

  if (Array.isArray(suites)) {
    suites.forEach(processSuite);
  } else {
    processSuite(suites);
  }

  return result;
};

const errorMessage = 'Please select valid "testng-results.xml"';

const getTestResults = (jsonData: any): TestResult => {
  const testResult = jsonData['testng-results'];

  try {
    const mapToResult: TestResult = {
      failed: parseInt(testResult.failed),
      passed: parseInt(testResult.passed),
      skipped: parseInt(testResult.skipped),
      ignored: parseInt(testResult.ignored),
      total: parseInt(testResult.total),
      test_suites: getTestSuites(testResult.suite),
    };
    return mapToResult;
    /* eslint-disable @typescript-eslint/no-unused-vars */
  } catch (error) {
    throw new Error(`Error while processing the XML file, ${errorMessage}`);
  }
};

const convertToJson = (data: string): string | null => {
  let jsonData = null;
  parseString(
    data,
    {
      explicitArray: false,
      mergeAttrs: true,
      emptyTag: () => '',
    },
    (error, result) => {
      if (error) {
        throw new Error(`Invalid file selected, ${errorMessage}`);
      }
      jsonData = result;
    }
  );
  return jsonData;
};

export { getTestResults, convertToJson };
