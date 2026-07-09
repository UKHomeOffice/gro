# E2E Tests

This folder contains the end-to-end test suite for the General Register Office (GRO) application.
The suite is implemented with Playwright Test and playwright-bdd using Gherkin feature files.

## Folder structure

- features/
- steps/
- fixture/
- pages/
- utility-helper/

## Run tests

1. Install dependencies:

```bash
yarn install
```

2. Install browser:

```bash
npx playwright install chromium
```

3. Run the suite:

```bash
yarn test:e2e
```
