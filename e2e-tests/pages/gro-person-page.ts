import { basePage } from './base-page';

export class groPersonPage extends basePage {
  async complete(personLabel: string, personName: string) {
    await this.fillInputByLabel(personLabel, personName);
    await this.clickContinueButton();
  }

  async completeUsingVisibleLabel(personName: string) {
    const supportedLabels = [
      'Tell us the full names of the person in the certificate you requested',
      'Whose name, including all middle names, is on the certificate you received?',
      'Whose name, including any middle names, is on the certificate you ordered?',
    ];

    for (const label of supportedLabels) {
      const control = this.page.getByLabel(label, { exact: true });
      if (await control.count()) {
        await control.fill(personName);
        await this.clickContinueButton();
        return;
      }
    }

    throw new Error('No supported person-name label found on GRO person page');
  }
}
