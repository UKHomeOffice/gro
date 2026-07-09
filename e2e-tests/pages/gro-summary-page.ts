import { expect, Locator } from '@playwright/test';
import { basePage } from './base-page';
import { GroScenarioData } from '../utility-helper/gro-scenario-data';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class groSummaryPage extends basePage {
  readonly confirmSubmissionButton: Locator;

  constructor(page: ConstructorParameters<typeof basePage>[0]) {
    super(page);
    this.confirmSubmissionButton = page.locator("input[value='Confirm submission']");
  }

  private summaryValue(label: string): Locator {
    return this.page.locator(`//dt[normalize-space()='${label}']/following-sibling::dd[1]`);
  }

  async assertSummaryPage(data: GroScenarioData) {
    await expect(this.page.getByRole('heading', { name: 'Your enquiry details' })).toBeVisible();
    await expect(this.page.getByRole('heading', { name: 'Your personal and contact details' })).toBeVisible();

    await expect(this.summaryValue('Type of Order')).toHaveText(data.orderType);
    await expect(this.summaryValue('Reason for contact')).toHaveText(data.reason);

    const hasCertificateRow = (await this.page.locator("//dt[normalize-space()='Type of certificate']").count()) > 0;
    if (hasCertificateRow) {
      await expect(this.summaryValue('Type of certificate')).toHaveText(data.certificateType);
    }

    const expectedDescription =
      data.reason === 'Service complaint' ? c.COMPLAINT_DETAILS : c.ENQUIRY_DETAILS;
    await expect(this.summaryValue('Further description')).toHaveText(expectedDescription);

    const hasOrderDetailsSection =
      (await this.page.getByRole('heading', { name: 'Your order details' }).count()) > 0;

    if (hasOrderDetailsSection) {
      await expect(this.summaryValue('How was the order placed?')).toHaveText(data.howPlaced);
      if (data.howPlaced === 'Online') {
        await expect(this.summaryValue('COL Number')).toHaveText(c.ONLINE_ORDER_NO);
      }
      if (data.howPlaced === 'Telephone') {
        await expect(this.summaryValue('Order Number')).toHaveText(c.TELEPHONE_ORDER_NO);
      }

      await expect(this.summaryValue('Service')).toHaveText(data.serviceType);
      await expect(this.summaryValue('Date of application')).toHaveText(this.toOrdinalDate(data.orderDate));
    }

    await expect(this.summaryValue('Full Name')).toHaveText(c.FULL_NAME);
    await expect(this.summaryValue('Email address')).toHaveText(c.CONTACT_EMAIL_ADDRESS);
    await expect(this.summaryValue('Country')).toHaveText(data.country);

    if (data.country === c.COUNTRY_UK) {
      await expect(this.summaryValue('Building and street')).toHaveText(c.ADDRESS_LINE_1);
      await expect(this.summaryValue('Address line 2')).toHaveText(c.ADDRESS_LINE_2);
      await expect(this.summaryValue('Town or city')).toHaveText(c.TOWN_OR_CITY);
      await expect(this.summaryValue('County or state')).toHaveText(c.COUNTY);
      const postcode = (await this.summaryValue('Postcode or ZIP Code').textContent())?.replaceAll(' ', '').trim();
      expect(postcode).toBe(c.POSTCODE.replaceAll(' ', ''));
    } else {
      await expect(this.summaryValue('Your current address')).toHaveText(c.ADDRESS);
    }
  }

  async submitQuestionnaire() {
    await this.confirmSubmissionButton.click();
  }

  async changeOrderType(orderType: string) {
    await this.page.locator('#order-type-change-').click();
    await this.selectRadio(orderType);
    await this.clickContinueButton();
  }

  async changeServiceType(serviceType: string) {
    await this.page.locator('#which-radio-change-').click();
    await this.selectRadio(serviceType);
    await this.clickContinueButton();
  }

  async getOrderAndServiceValues() {
    const orderChange = ((await this.summaryValue('Type of Order').textContent()) || '').trim();
    const serviceChange = ((await this.summaryValue('Service').textContent()) || '').trim();
    return { orderChange, serviceChange };
  }

  private toOrdinalDate(dateInput: string): string {
    const [d, m, y] = dateInput.split('/').map(Number);
    const date = new Date(y, m - 1, d);

    const day = date.getDate();
    const suffix =
      day > 3 && day < 21
        ? 'th'
        : ['th', 'st', 'nd', 'rd', 'th'][Math.min(day % 10, 4)];

    return `${day}${suffix} ${date.toLocaleString('en-GB', { month: 'long' })} ${date.getFullYear()}`;
  }
}
