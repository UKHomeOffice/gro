import { test as base } from 'playwright-bdd';
import { basePage } from '../pages/base-page';
import { groMakeAReportPage } from '../pages/gro-make-a-report-page';
import { groOrderTypePage } from '../pages/gro-order-type-page';
import { groContactReasonPage } from '../pages/gro-contact-reason-page';
import { groDetailsPage } from '../pages/gro-details-page';
import { groCertificateTypePage } from '../pages/gro-certificate-type-page';
import { groPersonPage } from '../pages/gro-person-page';
import { groPeoplePage } from '../pages/gro-people-page';
import { groAdditionalPage } from '../pages/gro-additional-page';
import { groHowPage } from '../pages/gro-how-page';
import { groServicePage } from '../pages/gro-service-page';
import { groOrderDatePage } from '../pages/gro-order-date-page';
import { groContactNamePage } from '../pages/gro-contact-name-page';
import { groEmailPage } from '../pages/gro-email-page';
import { groCheckEmailPage } from '../pages/gro-check-email-page';
import { groCountryPage } from '../pages/gro-country-page';
import { groUkAddressPage } from '../pages/gro-uk-address-page';
import { groNonUkAddressPage } from '../pages/gro-non-uk-address-page';
import { groSummaryPage } from '../pages/gro-summary-page';
import { groReportSubmittedPage } from '../pages/gro-report-submitted-page';

type Pages = {
  basePage: basePage;
  groMakeAReportPage: groMakeAReportPage;
  groOrderTypePage: groOrderTypePage;
  groContactReasonPage: groContactReasonPage;
  groDetailsPage: groDetailsPage;
  groCertificateTypePage: groCertificateTypePage;
  groPersonPage: groPersonPage;
  groPeoplePage: groPeoplePage;
  groAdditionalPage: groAdditionalPage;
  groHowPage: groHowPage;
  groServicePage: groServicePage;
  groOrderDatePage: groOrderDatePage;
  groContactNamePage: groContactNamePage;
  groEmailPage: groEmailPage;
  groCheckEmailPage: groCheckEmailPage;
  groCountryPage: groCountryPage;
  groUkAddressPage: groUkAddressPage;
  groNonUkAddressPage: groNonUkAddressPage;
  groSummaryPage: groSummaryPage;
  groReportSubmittedPage: groReportSubmittedPage;
};

export const test = base.extend<{ pages: Pages }>({
  pages: async ({ page }, use) => {
    await use({
      basePage: new basePage(page),
      groMakeAReportPage: new groMakeAReportPage(page),
      groOrderTypePage: new groOrderTypePage(page),
      groContactReasonPage: new groContactReasonPage(page),
      groDetailsPage: new groDetailsPage(page),
      groCertificateTypePage: new groCertificateTypePage(page),
      groPersonPage: new groPersonPage(page),
      groPeoplePage: new groPeoplePage(page),
      groAdditionalPage: new groAdditionalPage(page),
      groHowPage: new groHowPage(page),
      groServicePage: new groServicePage(page),
      groOrderDatePage: new groOrderDatePage(page),
      groContactNamePage: new groContactNamePage(page),
      groEmailPage: new groEmailPage(page),
      groCheckEmailPage: new groCheckEmailPage(page),
      groCountryPage: new groCountryPage(page),
      groUkAddressPage: new groUkAddressPage(page),
      groNonUkAddressPage: new groNonUkAddressPage(page),
      groSummaryPage: new groSummaryPage(page),
      groReportSubmittedPage: new groReportSubmittedPage(page),
    });
  },
});

export const expect = test.expect;
