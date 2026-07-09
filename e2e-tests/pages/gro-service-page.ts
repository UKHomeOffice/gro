import { basePage } from './base-page';

export class groServicePage extends basePage {
  async complete(serviceType: string) {
    await this.selectRadio(serviceType);
    await this.clickContinueButton();
  }
}
