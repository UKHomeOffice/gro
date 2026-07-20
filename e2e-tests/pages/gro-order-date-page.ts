import { basePage } from './base-page';

export class groOrderDatePage extends basePage {
  async complete(orderDate: string) {
    await this.enterDate(orderDate);
    await this.clickContinueButton();
  }
}
