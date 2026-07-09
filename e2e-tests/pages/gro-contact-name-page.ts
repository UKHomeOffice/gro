import { basePage } from './base-page';

export class groContactNamePage extends basePage {
  async complete(fullName: string) {
    await this.fillInputByLabel('What is your full name?', fullName);
    await this.clickContinueButton();
  }
}
