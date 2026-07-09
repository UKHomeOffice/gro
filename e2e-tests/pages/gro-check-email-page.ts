import { basePage } from './base-page';

export class groCheckEmailPage extends basePage {
  async complete(isCorrect: 'Yes' | 'No') {
    await this.selectRadio(isCorrect);
    await this.clickContinueButton();
  }
}
