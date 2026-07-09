import { basePage } from './base-page';

export class groDetailsPage extends basePage {
  async complete(detailsText: string, existing: 'Yes' | 'No', previous: 'Yes' | 'No') {
    const detailsLabel = (await this.headerText.textContent())?.includes('complaint')
      ? 'Provide details of your complaint'
      : 'Provide details of your enquiry';

    await this.fillTextAreaByLabel(detailsLabel, detailsText);
    await this.page.locator(`input[name='existing-radio'][value='${existing.toLowerCase()}']`).check();
    await this.page.locator(`input[name='previous-radio'][value='${previous.toLowerCase()}']`).check();
    await this.clickContinueButton();
  }

  async completeValidationComplaintPath(detailsText: string) {
    await this.fillTextAreaByLabel('Provide details of your complaint', detailsText);
    await this.page.locator("input[name='existing-radio'][value='yes']").check();
    await this.page.locator("input[name='previous-radio'][value='yes']").check();
    await this.clickContinueButton();
  }
}
