import { defineConfig } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';
import dotenv from 'dotenv';

dotenv.config({ quiet: true });

const baseURL = process.env.PLAYWRIGHT_BASE_URL || `https://certificate-enquiries.uat.sas-notprod.homeoffice.gov.uk/`;

const testDir = defineBddConfig({
    features: 'e2e-tests/features/**/*.feature',
    steps: [
        'e2e-tests/steps/**/*.step.ts',
        'e2e-tests/fixture/fixtures.ts',
    ],
    outputDir: '.features-gen',
});

export default defineConfig({
    testDir,
    timeout: 30000,
    expect: {
        timeout: 6000,
    },
    fullyParallel: true,
    workers: process.env.CI ? 2 : 1,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 1,
    reporter: [['html', { open: 'never' }], ['list']],
    use: {
        baseURL,
        viewport: null,
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'on-first-retry',
        headless: !!process.env.CI,
    },

    /* Configure projects for major browsers */
    projects: [
        {
            name: 'chromium',
            // use: { ...devices['Desktop Chrome'],
            use: {
                browserName: 'chromium',
                launchOptions: {
                    args: ['--start-maximized'],
                },
                video: 'on-first-retry', //Options => 'on', 'off', 'retain-on-failure' or 'on-first-retry'
                screenshot: 'only-on-failure', //Options => 'on', 'off', 'only-on-failure' or 'on-first-retry'
            },
        },
    ],
});

