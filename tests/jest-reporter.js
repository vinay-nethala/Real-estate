const fs = require('fs');
const path = require('path');

const RESULTS_DIR = path.join(__dirname, '..', 'test-results');

// Custom Jest reporter to generate required output files
class IntegrationReporter {
  constructor(globalConfig, options) {
    this._globalConfig = globalConfig;
    this._options = options;
  }

  onRunComplete(contexts, results) {
    fs.mkdirSync(RESULTS_DIR, { recursive: true });
    fs.mkdirSync(path.join(RESULTS_DIR, 'screenshots'), { recursive: true });

    // integration-report.json
    const report = {
      numTotalTests: results.numTotalTests,
      numPassedTests: results.numPassedTests,
      numFailedTests: results.numFailedTests,
      numPendingTests: results.numPendingTests,
      success: results.success,
      startTime: results.startTime,
      testResults: results.testResults.map(suite => ({
        testFilePath: suite.testFilePath,
        numPassingTests: suite.numPassingTests,
        numFailingTests: suite.numFailingTests,
        testResults: suite.testResults.map(test => ({
          title: test.title,
          fullName: test.fullName,
          status: test.status,
          duration: test.duration,
          failureMessages: test.failureMessages,
        })),
      })),
    };

    fs.writeFileSync(
      path.join(RESULTS_DIR, 'integration-report.json'),
      JSON.stringify(report, null, 2)
    );

    // geospatial-test-summary.json
    const geoTests = results.testResults
      .filter(s => s.testFilePath.includes('geospatial') || s.testFilePath.includes('location'))
      .flatMap(s => s.testResults);

    const summary = {
      totalGeospatialTests: geoTests.length,
      passed: geoTests.filter(t => t.status === 'passed').length,
      failed: geoTests.filter(t => t.status === 'failed').length,
      tests: geoTests.map(t => ({
        name: t.fullName,
        status: t.status,
        duration: t.duration,
      })),
    };

    fs.writeFileSync(
      path.join(RESULTS_DIR, 'geospatial-test-summary.json'),
      JSON.stringify(summary, null, 2)
    );
  }
}

module.exports = IntegrationReporter;
