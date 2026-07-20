import { basePage } from './base-page';
import { Page, Locator } from '@playwright/test';

export class groMakeAReportPage extends basePage {

    readonly acceptCookieButton: Locator;
    readonly hideThisMessageButton: Locator;

    constructor(page: Page) {
        super(page);
        this.acceptCookieButton = page.locator('#accept-cookies-button');
        this.hideThisMessageButton = page.locator('#hide-cookie-banner');
    }

    async navigateToUrl() {
        await this.page.goto('/about');
        if (await this.acceptCookieButton.isVisible()) {
            await this.acceptCookieButton.click();
        }

        if (await this.hideThisMessageButton.isVisible()) {
            await this.hideThisMessageButton.click();
        }
    }

    async expectedPageTitle(): Promise<string> {
        return 'Which type of order are you contacting us about? – Enquire about your certificate order';
    }
}
