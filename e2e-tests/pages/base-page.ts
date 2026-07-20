import { expect, Locator, Page } from '@playwright/test';

export class basePage {
    readonly page: Page;
    readonly headerText: Locator;
    readonly continueButton: Locator;
    readonly errorSummaryTitle: Locator;
    readonly errorSummaryListItems: Locator;
    readonly headerLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.headerText = page.locator('h1');
        this.continueButton = page.locator("input[value='Continue']");
        this.errorSummaryTitle = page.locator('#error-summary-title');
        this.errorSummaryListItems = page.locator('.govuk-error-summary__list li a');
        this.headerLink = page.getByRole('link', { name: 'Enquire about your certificate order' });
    }

    async assertPageTitle(title: string) {
        const escapedTitle = title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        await expect(this.page).toHaveTitle(new RegExp(`^${escapedTitle}(?: – GOV\\.UK)?$`));
    }

    async clickContinueButton() {
        await this.continueButton.click();
    }

    async clickBackLink(linkText = 'Back') {
        await this.page.getByRole('link', { name: linkText, exact: true }).click();
    }

    async selectRadio(optionText: string) {
        await this.page.getByRole('radio', { name: optionText, exact: true }).check();
    }

    async fillInputByLabel(label: string, value: string) {
        await this.page.getByLabel(label, { exact: true }).fill(value);
    }

    async fillTextAreaByLabel(label: string, value: string) {
        await this.page.getByLabel(label, { exact: true }).fill(value);
    }

    async enterDate(dateValue: string) {
        const [day, month, year] = dateValue.split('/');
        await this.page.getByLabel('Day').fill(day);
        await this.page.getByLabel('Month').fill(month);
        await this.page.getByLabel('Year').fill(year);
    }

    async getErrorSummaryHeaderText(): Promise<string> {
        return (await this.errorSummaryTitle.textContent())?.trim() || '';
    }

    async getErrorMessageDetailText(): Promise<string> {
        return (await this.errorSummaryListItems.first().textContent())?.trim() || '';
    }

    async getErrorLinkByText(errorText: string): Promise<string> {
        return (await this.page.getByRole('link', { name: errorText, exact: true }).first().textContent())?.trim() || '';
    }

    async selectCountry(country: string) {
        const countryControl = this.page.locator('#country-select').first();
        const isVisible = await countryControl.isVisible();

        if (isVisible) {
            const tagName = await countryControl.evaluate(el => el.tagName.toLowerCase());

            if (tagName === 'select') {
                await this.page.selectOption('#country-select', { label: country });
                return;
            }

            await countryControl.fill(country);

            if (country === 'Invalid country') {
                await this.page.keyboard.press('Tab');
                return;
            }

            await this.page.keyboard.press('ArrowDown');
            await this.page.keyboard.press('Enter');
            await this.page.keyboard.press('Tab');
            return;
        }

        const typeaheadInput = this.page.locator('.autocomplete__input').first();
        await typeaheadInput.fill(country);
        await this.page.keyboard.press('Tab');
    }
}
