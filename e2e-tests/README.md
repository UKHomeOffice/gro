# E2E Tests

This folder contains the end-to-end test suite for the General Register Office (GRO) application.
The suite is implemented with Playwright Test and `playwright-bdd` using Gherkin feature files.

## Folder structure

- `features/` contains the Gherkin scenarios.
- `steps/` contains their Playwright step definitions.
- `fixture/` contains shared fixtures.
- `pages/` contains page objects.
- `utility-helper/` contains shared test data and utilities.

## Run tests

Install dependencies and the Chromium browser, then set `SAS_HOF_EMAIL` to a
valid test address:

```powershell
yarn install
npx playwright install chromium
yarn test:e2e
```

`yarn test:e2e` clears the previous Allure results, generates the BDD test
scaffolding, and runs the suite. `yarn test:e2e:report` generates and opens the
single-file Allure report from the latest results. Run the focused report
summary tests with `yarn test:e2e:summary`.

## Nightly reporting

Drone runs the `nightly_e2e_playwright` cron against the GRO UAT URL configured
as `NIGHTLY_E2E_BASE_URL` in `.drone.yml`. The pipeline writes a JSON summary
associated with the current Drone build, generates an Allure report even when
tests fail, publishes the report as a downloadable GitHub release asset, and
sends a Slack notification on successful and failed runs. Slack test status is
based on the current Playwright run; the expanded report separately shows the
overall Drone build status.

The pipeline uses the existing Drone secrets `SAS_HOF_EMAIL`,
`slack_sas_hof_e2e_tests_webhook`, and the UKHO GitHub App credentials declared
in `.drone.yml`. The cron schedule itself is configured in Drone using the
`nightly_e2e_playwright` cron name.
