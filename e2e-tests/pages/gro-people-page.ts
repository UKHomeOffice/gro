import { basePage } from './base-page';

export class groPeoplePage extends basePage {
  async complete(partyOneName: string, partyTwoName: string) {
    await this.fillInputByLabel('Tell us the full names of party one on the certificate you requested', partyOneName);
    await this.fillInputByLabel('Tell us the full names of party two on the certificate you requested (optional)', partyTwoName);
    await this.clickContinueButton();
  }
}
