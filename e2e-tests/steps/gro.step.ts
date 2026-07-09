import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';
import { test } from '../fixture/fixtures';
import { ConstantsLib as c } from '../utility-helper/constants-lib';
import { getGroScenarioData, GroScenarioData } from '../utility-helper/gro-scenario-data';

export const { Given, When, Then } = createBdd(test);

let scenarioData: GroScenarioData;

Given('Test data has been created for {string} scenarios', async ({}, product: string) => {
  if (product !== 'GRO') {
    throw new Error(`Unsupported product data setup: ${product}`);
  }
});

Given('I selected the data for scenario {string} - {string}', async ({}, scenarioId: string, _description: string) => {
  scenarioData = getGroScenarioData(scenarioId);
});

When('I visit the General Register Office page', async ({ pages }) => {
  await pages.groMakeAReportPage.navigateToUrl();
  await pages.groMakeAReportPage.assertPageTitle(await pages.groMakeAReportPage.expectedPageTitle());
});

Then('I see header link service name {string}', async ({ pages }, headerLink: string) => {
  await expect(pages.basePage.headerLink).toHaveText(headerLink);
});

When('I fill out my answers to the GRO questionnaire', async ({ pages }) => {
  await pages.groOrderTypePage.complete(scenarioData.orderType);
  await pages.groContactReasonPage.complete(scenarioData.reason);

  const isComplaintOrFeedback = scenarioData.reason === 'Service complaint' || scenarioData.reason === 'Other issues and feedback';
  let detailsConfig: { existing: 'Yes' | 'No'; previous: 'Yes' | 'No' } = { existing: 'Yes', previous: 'No' };

  if (isComplaintOrFeedback) {
    detailsConfig = parseDetailsConfig(
      scenarioData.reason === 'Service complaint' ? scenarioData.complaintDetails : scenarioData.enquiryDetails,
    );
    const detailsText = scenarioData.reason === 'Service complaint' ? c.COMPLAINT_DETAILS : c.ENQUIRY_DETAILS;
    await pages.groDetailsPage.complete(
      detailsText,
      detailsConfig.existing,
      detailsConfig.previous,
    );

    if (detailsConfig.existing === 'No') {
      await completeContactAndAddressDetails(pages, scenarioData);
      return;
    }
  }

  await pages.groCertificateTypePage.complete(scenarioData.certificateType);

  if (isPeopleCertificate(scenarioData.certificateType)) {
    await pages.groPeoplePage.complete(c.PARTY_ONE_NAME, c.PARTY_TWO_NAME);
  } else {
    await pages.groPersonPage.complete(getPersonLabel(scenarioData.reason), c.FULL_NAME);
  }

  if (!isComplaintOrFeedback) {
    const previousContact = scenarioData.additionalInfo === 'N/A' ? 'No' : scenarioData.additionalInfo;
    const additionalNames = scenarioData.reason === 'Wrong order received' ? c.FULL_NAME : null;
    await pages.groAdditionalPage.complete(additionalNames, c.ENQUIRY_DETAILS, previousContact);
  }

  await pages.groHowPage.complete(scenarioData.howPlaced, c.ONLINE_ORDER_NO, c.TELEPHONE_ORDER_NO);
  await pages.groServicePage.complete(scenarioData.serviceType);
  await pages.groOrderDatePage.complete(scenarioData.orderDate);

  await completeContactAndAddressDetails(pages, scenarioData);
});

async function completeContactAndAddressDetails(pages: any, data: GroScenarioData) {
  await pages.groContactNamePage.complete(c.FULL_NAME);
  await pages.groEmailPage.complete(c.CONTACT_EMAIL_ADDRESS);
  await pages.groCheckEmailPage.complete(data.emailIsCorrect);

  if (data.emailIsCorrect === 'No') {
    await pages.groEmailPage.complete(c.CONTACT_EMAIL_ADDRESS);
    await pages.groCheckEmailPage.complete('Yes');
  }

  await pages.groCountryPage.complete(data.country);

  if (data.country === c.COUNTRY_UK) {
    await pages.groUkAddressPage.complete({
      building: c.ADDRESS_LINE_1,
      street: c.ADDRESS_LINE_2,
      townOrCity: c.TOWN_OR_CITY,
      county: c.COUNTY,
      postcode: c.POSTCODE,
    });
    return;
  }

  await pages.groNonUkAddressPage.complete(c.ADDRESS);
}

Then('I check the information given is correct', async ({ pages }) => {
  await pages.groSummaryPage.assertSummaryPage(scenarioData);
});

Given('I am able to submit the GRO questionnaire', async ({ pages }) => {
  await pages.groSummaryPage.submitQuestionnaire();
  await pages.groReportSubmittedPage.assertSubmitted();
});

When('I change order type to {string} and service type to {string} type and continue', async ({ pages }, orderType: string, serviceType: string) => {
  await pages.groSummaryPage.changeOrderType(orderType);
  await pages.groSummaryPage.changeServiceType(serviceType);
});

Then('I check the {string} and {string} type changes are updated on the information summary page', async ({ pages }, orderType: string, serviceType: string) => {
  const values = await pages.groSummaryPage.getOrderAndServiceValues();
  expect(values.orderChange).toBe(orderType);
  expect(values.serviceChange).toBe(serviceType);
});

When('I click on the header link', async ({ pages }) => {
  await pages.basePage.headerLink.click();
});

Then('I am returned back to home page', async ({ pages }) => {
  await expect(pages.basePage.headerLink).toBeVisible();
});

When('I select continue', async ({ pages }) => {
  await pages.basePage.clickContinueButton();
});

Then('I see {string} error header message displayed for GRO', async ({ pages }, expectedErrorMessage: string) => {
  expect(await pages.basePage.getErrorSummaryHeaderText()).toBe(expectedErrorMessage);
});

Then('I see {string} error message displayed for GRO', async ({ pages }, expectedErrorMessage: string) => {
  expect(await pages.basePage.getErrorMessageDetailText()).toBe(expectedErrorMessage);
});

Then('I see {string} error link message displayed for GRO', async ({ pages }, expectedErrorMessage: string) => {
  expect(await pages.basePage.getErrorLinkByText(expectedErrorMessage)).toBe(expectedErrorMessage);
});

When('I select order type {string} and click continue', async ({ pages }, orderType: string) => {
  await pages.groOrderTypePage.complete(orderType);
});

When('I select reason for contacting us {string} and click continue', async ({ pages }, reason: string) => {
  await pages.groContactReasonPage.complete(reason);
});

When('I select certificate type {string} and click continue', async ({ pages }, certType: string) => {
  await pages.groCertificateTypePage.complete(certType);
});

When('I enter full name on certificate and click continue', async ({ pages }) => {
  await pages.groPersonPage.completeUsingVisibleLabel(c.FULL_NAME);
});

When('I enter additional information, select {string} and click continue', async ({ pages }, previousContact: string) => {
  await pages.groAdditionalPage.complete(c.FULL_NAME, c.ENQUIRY_DETAILS, previousContact as 'Yes' | 'No');
});

When('I select how you placed order and click continue', async ({ pages }) => {
  await pages.groHowPage.complete('Post', c.ONLINE_ORDER_NO, c.TELEPHONE_ORDER_NO);
});

When('I select service type and click continue', async ({ pages }) => {
  await pages.groServicePage.complete('Standard');
});

When('I enter order date {string} and click continue', async ({ pages }, orderDate: string) => {
  await pages.groOrderDatePage.complete(orderDate);
});

When('I enter full name and click continue', async ({ pages }) => {
  await pages.groContactNamePage.complete(c.FULL_NAME);
});

When('I complete the enquiry compliant page details and click continue', async ({ pages }) => {
  await pages.groDetailsPage.completeValidationComplaintPath(c.COMPLAINT_DETAILS);
});

When('I click the {string} button for GRO', async ({ pages }, back: string) => {
  await pages.basePage.clickBackLink(back);
});

When('I enter email address {string} and click continue', async ({ pages }, email: string) => {
  await pages.groEmailPage.complete(email);
});

When('I confirm email address entered is correct and click continue', async ({ pages }) => {
  await pages.groCheckEmailPage.complete('Yes');
});

When('I enter country {string} and click continue', async ({ pages }, country: string) => {
  await pages.groCountryPage.complete(country);
});

When('I enter address and click continue', async ({ pages }) => {
  await pages.groNonUkAddressPage.complete(c.ADDRESS);
});

function isPeopleCertificate(certificateType: string): boolean {
  return certificateType === 'Marriage' || certificateType === 'Civil partnership';
}

function getPersonLabel(reason: string): string {
  if (reason === 'Poor quality order') {
    return 'Whose name, including all middle names, is on the certificate you received?';
  }

  if (reason === 'Wrong order received') {
    return 'Tell us the full names of the person in the certificate you requested';
  }

  return 'Whose name, including any middle names, is on the certificate you ordered?';
}

function parseDetailsConfig(details: string): { existing: 'Yes' | 'No'; previous: 'Yes' | 'No' } {
  const normalized = details || '';

  if (normalized.includes('Existing=Yes') && normalized.includes('Previous=Yes')) {
    return { existing: 'Yes', previous: 'Yes' };
  }

  if (normalized.includes('Existing=Yes') && normalized.includes('Previous=No')) {
    return { existing: 'Yes', previous: 'No' };
  }

  if (normalized.includes('Existing=No') && normalized.includes('Previous=Yes')) {
    return { existing: 'No', previous: 'Yes' };
  }

  return { existing: 'No', previous: 'No' };
}
