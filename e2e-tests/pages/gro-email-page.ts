import { basePage } from './base-page';

export class groEmailPage extends basePage {
  async complete(email: string) {
    await this.fillInputByLabel('What is your email address?', email);
    await this.clickContinueButton();
  }
}
