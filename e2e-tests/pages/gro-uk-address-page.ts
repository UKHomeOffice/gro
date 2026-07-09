import { basePage } from './base-page';

type UkAddress = {
  building: string;
  street: string;
  townOrCity: string;
  county: string;
  postcode: string;
};

export class groUkAddressPage extends basePage {
  async complete(address: UkAddress) {
    await this.fillInputByLabel('Building and street', address.building);
    await this.fillInputByLabel('Address line 2', address.street);
    await this.fillInputByLabel('Town or city', address.townOrCity);
    await this.fillInputByLabel('County', address.county);
    await this.fillInputByLabel('Postcode', address.postcode);
    await this.clickContinueButton();
  }
}
