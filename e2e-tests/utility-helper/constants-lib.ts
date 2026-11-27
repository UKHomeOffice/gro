export class ConstantsLib {
  readonly FULL_NAME = 'HOF TEST';
  readonly PARTY_ONE_NAME = 'PartyOne Name1';
  readonly PARTY_TWO_NAME = 'PartyTwo Name2';
  readonly ENQUIRY_DETAILS = 'Missed delivery date';
  readonly COMPLAINT_DETAILS = 'Received Item is damaged';
  readonly CONTACT_EMAIL_ADDRESS = requiredEnv('SAS_HOF_EMAIL');
  readonly ONLINE_ORDER_NO = 'COL123456/2018';
  readonly TELEPHONE_ORDER_NO = '12345-2';
  readonly ADDRESS = '49, Sydenham road, Croydon, Surrey, CR0 2EU';
  readonly ADDRESS_LINE_1 = '49 Sydenham road';
  readonly ADDRESS_LINE_2 = 'Croydon';
  readonly TOWN_OR_CITY = 'Surrey';
  readonly COUNTY = 'Surrey';
  readonly POSTCODE = 'CR0 2EU';
  readonly COUNTRY_UK = 'United Kingdom';
}

function requiredEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`${name} is not configured`);
  }
  return value;
}