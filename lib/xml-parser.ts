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
      class_name: exception['class'],
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
  if (groups) {
    if (groups.length) {
      for (const group of groups) {
        const tag = group.name;
        const groupMethod = group.method?.name;
        const groupClass = group.method?.class;
        if (className === groupClass && methodName === groupMethod) {
          result.push(tag);
        }
      }
    } else {
      const tag = groups.name;
      const groupMethod = groups.method?.name;
      const groupClass = groups.method?.class;
      if (className === groupClass && methodName === groupMethod) {
        result.push(tag);
      }
    }
  }
  return result;
};

const getTestMethods = (
  methods: any,
  className: string,
  groups: any
): TestMethod[] => {
  const result: TestMethod[] = [];
  let index = 1;
  if (methods.length) {
    for (const method of methods) {
      result.push({
        id: index++,
        name: method['name'],
        description: method['description'] || '',
        is_config: !!method['is-config'],
        started_at: method['started-at'],
        finished_at: method['finished-at'],
        duration_ms: method['duration-ms'],
        tags: getTags(className, method.name, groups),
        status: method['status'],
        exception: getTestException(method.exception),
        log: getTestLog(method['reporter-output']),
      });
    }
  } else {
    result.push({
      id: index,
      name: methods['name'],
      description: methods['description'] || '',
      is_config: !!methods['is-config'],
      started_at: methods['started-at'],
      finished_at: methods['finished-at'],
      duration_ms: methods['duration-ms'],
      tags: getTags(className, methods.name, groups),
      status: methods['status'],
      exception: getTestException(methods.exception),
      log: getTestLog(methods['reporter-output']),
    });
  }
  return result;
};

const getTestClasses = (classes: any, groups: any): TestClass[] => {
  const result: TestClass[] = [];
  if (classes.length) {
    for (const cls of classes) {
      result.push({
        name: cls.name,
        test_methods: getTestMethods(cls['test-method'], cls.name, groups),
      });
    }
  } else {
    result.push({
      name: classes.name,
      test_methods: getTestMethods(
        classes['test-method'],
        classes.name,
        groups
      ),
    });
  }
  return result;
};

const getTestCases = (tests: any, groups: any): TestCase[] => {
  const result: TestCase[] = [];
  if (tests) {
    if (tests.length) {
      for (const test of tests) {
        result.push({
          name: test['name'],
          started_at: test['started-at'],
          finished_at: test['finished-at'],
          duration_ms: test['duration-ms'],
          test_classes: getTestClasses(test.class, groups),
        });
      }
    } else {
      result.push({
        name: tests['name'],
        started_at: tests['started-at'],
        finished_at: tests['finished-at'],
        duration_ms: tests['duration-ms'],
        test_classes: getTestClasses(tests.class, groups),
      });
    }
  }
  return result;
};

const getTestSuites = (suites: any): TestSuite[] => {
  const result: TestSuite[] = [];
  if (suites.length) {
    for (const suite of suites) {
      result.push({
        name: suite['name'],
        started_at: suite['started-at'],
        finished_at: suite['finished-at'],
        duration_ms: parseInt(suite['duration-ms']),
        test_cases: getTestCases(suite.test, suites.groups?.group),
      });
    }
  } else {
    result.push({
      name: suites['name'],
      started_at: suites['started-at'],
      finished_at: suites['finished-at'],
      duration_ms: parseInt(suites['duration-ms']),
      test_cases: getTestCases(suites.test, suites.groups?.group),
    });
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
