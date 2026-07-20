import { basePage } from './base-page';

export class groNonUkAddressPage extends basePage {
  async complete(fullAddress: string) {
    await this.fillTextAreaByLabel('Your current address', fullAddress);
    await this.clickContinueButton();
  }
}
