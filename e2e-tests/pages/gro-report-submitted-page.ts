import { expect, Locator, Page } from '@playwright/test';
import { basePage } from './base-page';

export class groReportSubmittedPage extends basePage {
  readonly confirmationText: Locator;

  constructor(page: Page) {
    super(page);
    this.confirmationText = page.getByRole('heading', {
      name: 'Thank you for contacting the General Register Office.',
      level: 1,
    });
  }

  async assertSubmitted() {
    await expect(this.confirmationText).toBeVisible();
    const title = 'Thank you for contacting the General Register Office. – Enquire about your certificate order';
    const escapedTitle = title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    await expect(this.page).toHaveTitle(new RegExp(`^${escapedTitle}(?: – GOV\\.UK)?$`));
  }
}
