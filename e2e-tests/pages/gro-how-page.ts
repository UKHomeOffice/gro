import { basePage } from './base-page';

export class groHowPage extends basePage {
  async complete(howPlaced: 'Online' | 'Telephone' | 'Post', onlineOrderNo: string, telephoneOrderNo: string) {
    await this.selectRadio(howPlaced);

    if (howPlaced === 'Online') {
      await this.fillInputByLabel('What is your COL number?', onlineOrderNo);
    }

    if (howPlaced === 'Telephone') {
      await this.fillInputByLabel('What is your order number? (Optional)', telephoneOrderNo);
    }

    await this.clickContinueButton();
  }
}
