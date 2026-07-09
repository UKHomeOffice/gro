import { basePage } from './base-page';

export class groOrderTypePage extends basePage {
  async complete(orderType: string) {
    await this.selectRadio(orderType);
    await this.clickContinueButton();
  }
}
