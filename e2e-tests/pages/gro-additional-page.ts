import { basePage } from './base-page';

export class groAdditionalPage extends basePage {
  async complete(additionalNames: string | null, additionalText: string, previousContact: 'Yes' | 'No') {
    if (additionalNames) {
      await this.fillTextAreaByLabel('Whose name(s), including any middle names, is on the certificate you received?', additionalNames);
    }

    await this.fillTextAreaByLabel('What else would you like to tell us about your enquiry?', additionalText);
    await this.selectRadio(previousContact);
    await this.clickContinueButton();
  }
}
