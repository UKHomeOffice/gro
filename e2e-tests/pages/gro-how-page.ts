import { basePage } from './base-page';
import { Locator, Page } from '@playwright/test';

export class groHowPage extends basePage {
  readonly onlineText: Locator;

  constructor(page: Page) {
          super(page);
          this.onlineText = page.locator('#online-toggle-text');
  }

  async complete(howPlaced: 'Online' | 'Telephone' | 'Post', onlineOrderNo: string, telephoneOrderNo: string) {
    await this.selectRadio(howPlaced);

    if (howPlaced === 'Online') {
      await this.fillInput(this.onlineText, onlineOrderNo);
    }

    if (howPlaced === 'Telephone') {
      await this.fillInputByLabel('What is your order number? (Optional)', telephoneOrderNo);
    }

    await this.clickContinueButton();
  }
}
