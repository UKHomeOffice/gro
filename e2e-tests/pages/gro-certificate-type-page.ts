import { basePage } from './base-page';

export class groCertificateTypePage extends basePage {
  async complete(certificateType: string) {
    await this.selectRadio(certificateType);
    await this.clickContinueButton();
  }
}
