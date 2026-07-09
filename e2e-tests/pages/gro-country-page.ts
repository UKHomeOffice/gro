import { basePage } from './base-page';

export class groCountryPage extends basePage {
  async complete(country: string) {
    await this.selectCountry(country);
    await this.clickContinueButton();
  }
}
