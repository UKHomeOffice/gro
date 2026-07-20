import { basePage } from './base-page';

export class groContactReasonPage extends basePage {
  async complete(reason: string) {
    await this.selectRadio(reason);
    await this.clickContinueButton();
  }
}
