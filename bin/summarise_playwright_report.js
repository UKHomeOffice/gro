'use strict';

const fs = require('node:fs');

const CATEGORIES = [
  { key: 'expected', label: 'Passed' },
  { key: 'unexpected', label: 'Failed' },
  { key: 'flaky', label: 'Flaky' },
  { key: 'skipped', label: 'Skipped' }
];

function parseExitCode(value) {
  if (typeof value === 'number' && Number.isSafeInteger(value) && value >= 0 && value <= 255) {
    return value;
  }
  if (typeof value === 'string' && /^(0|[1-9]\d{0,2})$/.test(value) && Number(value) <= 255) {
    return Number(value);
  }
  return null;
}

function collectOutcomes(suites, outcomes = []) {
  if (!Array.isArray(suites)) {
    throw new Error('test suites are missing or invalid');
  }
  for (const suite of suites) {
    if (!suite || typeof suite !== 'object' ||
        (suite.specs !== undefined && !Array.isArray(suite.specs))) {
      throw new Error('test suites are invalid');
    }
    for (const spec of suite.specs || []) {
      if (!spec || !Array.isArray(spec.tests)) {
        throw new Error('test entries are missing or invalid');
      }
      for (const test of spec.tests) {
        if (!test || !CATEGORIES.some(category => category.key === test.status)) {
          throw new Error('test outcomes are missing or invalid');
        }
        outcomes.push(test.status);
      }
    }
    collectOutcomes(suite.suites === undefined ? [] : suite.suites, outcomes);
  }
  return outcomes;
}

function buildSummary(report, rawExitCode, buildNumber, readError) {
  const playwrightExitCode = parseExitCode(rawExitCode);
  const issues = [];
  if (playwrightExitCode === null) {
    issues.push('Playwright exit status is missing or invalid');
  }
  if (!buildNumber) {
    issues.push('Drone build number is missing');
  }
  if (readError) {
    issues.push(readError);
  }

  let counts = null;
  let percentages = null;
  let reported = null;
  let discovered = null;

  try {
    if (!report || typeof report !== 'object' || Array.isArray(report) ||
        !report.stats || typeof report.stats !== 'object' || !Array.isArray(report.errors)) {
      throw new Error('Playwright statistics or run errors are missing or invalid');
    }

    const outcomes = collectOutcomes(report.suites);
    discovered = outcomes.length;
    counts = {};
    for (const { key } of CATEGORIES) {
      const count = report.stats[key];
      if (!Number.isSafeInteger(count) || count < 0) {
        throw new Error(`stats.${key} must be a non-negative integer`);
      }
      counts[key] = count;
    }
    reported = CATEGORIES.reduce((sum, { key }) => sum + counts[key], 0);
    if (!Number.isSafeInteger(reported)) {
      throw new Error('result count exceeds the supported integer range');
    }
    if (discovered === 0) {
      throw new Error('no test outcomes were reported');
    }
    if (CATEGORIES.some(({ key }) =>
      counts[key] !== outcomes.filter(status => status === key).length)) {
      throw new Error('Playwright statistics do not match test outcomes');
    }
    if (playwrightExitCode === 0 && counts.unexpected > 0) {
      throw new Error('Playwright exited successfully despite unexpected test outcomes');
    }
    if (report.errors.length) {
      throw new Error(`${report.errors.length} Playwright run error(s); see build logs`);
    }
    percentages = Object.fromEntries(CATEGORIES.map(({ key }) =>
      [key, Number((counts[key] / discovered * 100).toFixed(1))]));
  } catch (error) {
    issues.push(error.message);
    counts = null;
    percentages = null;
    reported = null;
    discovered = null;
  }

  const valid = issues.length === 0;
  return {
    valid,
    testStatus: valid && playwrightExitCode === 0 ? 'Passed' : 'Failed',
    buildNumber: buildNumber || null,
    playwrightExitCode,
    counts,
    percentages,
    reported,
    discovered,
    issues
  };
}

function summaryText(summary) {
  if (!summary.counts || !summary.percentages ||
      summary.reported === null || summary.discovered === null) {
    return [
      'Passed: N/A No Of Tests: N/A',
      'Failed: N/A No Of Tests: N/A',
      'Flaky: N/A No Of Tests: N/A',
      'Skipped: N/A No Of Tests: N/A',
      'Total Results Reported: unknown',
      `Results: INVALID (${summary.issues.join('; ') || 'Playwright results are invalid'})`
    ].join('\n');
  }

  const lines = CATEGORIES.map(({ key, label }) =>
    `${label}: ${summary.percentages[key].toFixed(1)}% No Of Tests: ${summary.counts[key]}`);
  lines.push(`Total Results Reported: ${summary.reported} of ${summary.discovered}`);
  if (!summary.valid) {
    lines.push(`Results: INVALID (${summary.issues.join('; ')})`);
  }
  return lines.join('\n');
}

function main() {
  const [inputPath, textOutputPath, rawExitCode, jsonOutputPath, buildNumber] = process.argv.slice(2);
  if (!inputPath || !textOutputPath || !jsonOutputPath || !buildNumber) {
    process.stderr.write(
      'Usage: node bin/summarise_playwright_report.js <playwright-json> <summary-txt> ' +
      '<playwright-exit-code> <summary-json> <build-number>\n'
    );
    process.exitCode = 1;
    return;
  }

  let report;
  let readError;
  try {
    report = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
  } catch (error) {
    readError = `unable to read Playwright results: ${error.message}`;
  }

  const summary = buildSummary(report, rawExitCode, buildNumber, readError);
  const text = summaryText(summary);
  fs.writeFileSync(textOutputPath, `${text}\n`, 'utf8');
  fs.writeFileSync(jsonOutputPath, `${JSON.stringify(summary, null, 2)}\n`, 'utf8');
  process.stdout.write(`${text}\n`);
  if (!summary.valid) {
    process.exitCode = 1;
  }
}

if (require.main === module) {
  main();
}

module.exports = { buildSummary, summaryText };
