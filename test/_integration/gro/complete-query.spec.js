const { expect } = require('chai');
const moment = require('moment');

describe('complete journey of a query, for a non-partnership certificate', () => {
  // Complete path for users with a wrong certificate enquiry for a birth certificate
  // Path also applies for other queires listed below:
  // certificate not recieved, wrong certificate, poor quality certificate or refund, on non-partneship certificates
  // e.g. birth, death or adoption certificate.
  // Also has tests for the summary /confirm at the end
  // Validatations on all pages in this path

  let testApp;
  let passStep;
  let getUrl;
  let initSession;
  let getDom;
  let parseHtml;
  let now;

  const getSectionHeaderByText = (document, text) => {
    const headers = document.querySelectorAll('h2.section-header');

    return Array(headers.length)
      .fill().map((_, i) => headers[i].textContent).find(header => header.match(text));
  };

  const SUBAPP = 'gro';

  before(() => {
    testApp = getSupertestApp(SUBAPP);
    getUrl = testApp.getUrl;
    parseHtml = testApp.parseHtml;
    getDom = testApp.getDom;
    passStep = testApp.passStep;
    initSession = testApp.initSession;
  });

  beforeEach(() => {
    now = moment();
  });

  it('does not pass /about if no options selected', async () => {
    const URI = '/about';
    await initSession(URI);
    await passStep(URI, {});

    const res = await getUrl(URI);
    const docu = await parseHtml(res);
    const validationSummary = docu.find('.validation-summary');

    expect(validationSummary.length === 1).to.be.true;
    expect(validationSummary.html())
      .to.match(/Tell us what you are contacting us about/);
  });

  it('goes to /about', async () => {
    const URI = '/about';
    await initSession(URI);
    const response = await passStep(URI, {
      'about-radio': 'wrong-certificate'
    });

    expect(response.text).to.contain('Found. Redirecting to /type');
  });

  it('does not pass /type if no options selected', async () => {
    const URI = '/type';
    await initSession(URI);
    await passStep(URI, {});

    const res = await getUrl(URI);
    const docu = await parseHtml(res);
    const validationSummary = docu.find('.validation-summary');

    expect(validationSummary.length === 1).to.be.true;
    expect(validationSummary.html())
      .to.match(/Tell us the type of certificate that was ordered/);
  });

  it('goes to /type', async () => {
    const URI = '/type';
    await initSession(URI);
    const response = await passStep(URI, {
      'type-radio': 'birth'
    });

    expect(response.text).to.contain('Found. Redirecting to /person');
  });

  it('does not pass /person if field is empty', async () => {
    const URI = '/person';
    await initSession(URI);
    await passStep(URI, {});

    const res = await getUrl(URI);
    const docu = await parseHtml(res);
    const validationSummary = docu.find('.validation-summary');

    expect(validationSummary.length === 1).to.be.true;
    expect(validationSummary.html())
      .to.match(/Enter a full name/);
  });

  it('goes to /person', async () => {
    const URI = '/person';
    await initSession(URI);
    const response = await passStep(URI, {
      'person-text': 'Jane Doe'
    });

    expect(response.text).to.contain('Found. Redirecting to /additional');
  });

  it('does not pass /additional if additional-radio is not selected ', async () => {
    const URI = '/additional';
    await initSession(URI);
    await passStep(URI, {});

    const res = await getUrl(URI);
    const docu = await parseHtml(res);
    const validationSummary = docu.find('.validation-summary');

    expect(validationSummary.length === 1).to.be.true;
    expect(validationSummary.html())
      .to.match(/Tell us if you have previously been in contact about this enquiry/);
  });

  it('goes to /additional', async () => {
    const URI = '/additional';
    await initSession(URI);
    const response = await passStep(URI, {
      'additional-names': 'Elizabeth',
      'additional-text': 'Some text',
      'additional-radio': 'yes'
    });

    expect(response.text).to.contain('Found. Redirecting to /how');
  });

  it('does not pass /how page if no options selected', async () => {
    const URI = '/how';
    await initSession(URI);
    await passStep(URI, {});

    const res = await getUrl(URI);
    const docu = await parseHtml(res);
    const validationSummary = docu.find('.validation-summary');

    expect(validationSummary.length === 1).to.be.true;
    expect(validationSummary.html())
      .to.match(/Tell us how you placed your order/);
  });

  it('goes to how', async () => {
    const URI = '/how';
    await initSession(URI);
    const response = await passStep(URI, {
      'how-radio': 'post'
    });

    expect(response.text).to.contain('Found. Redirecting to /which');
  });

  it('does not pass /which if no options are selected', async () => {
    const URI = '/which';
    await initSession(URI);
    await passStep(URI, {});

    const res = await getUrl(URI);
    const docu = await parseHtml(res);
    const validationSummary = docu.find('.validation-summary');

    expect(validationSummary.length === 1).to.be.true;
    expect(validationSummary.html())
      .to.match(/Tell us which service you paid for/);
  });

  it('goes to /which', async () => {
    const URI = '/which';
    await initSession(URI);
    const response = await passStep(URI, {
      'which-radio': 'priority'
    });

    expect(response.text).to.contain('Found. Redirecting to /when');
  });

  it('does not pass /when if field is empty', async () => {
    const URI = '/when';
    await initSession(URI);
    await passStep(URI, {});

    const res = await getUrl(URI);
    const docu = await parseHtml(res);
    const validationSummary = docu.find('.validation-summary');

    expect(validationSummary.length === 1).to.be.true;
    expect(validationSummary.html())
      .to.match(/Tell us when you placed your order/);
  });

  it('does not pass /when if date entered is earlier than 2010-01-01', async () => {
    const URI = '/when';
    await initSession(URI);
    await passStep(URI, {
      'when-date': '2009-11-22'
    });

    const res = await getUrl(URI);
    const docu = await parseHtml(res);
    const validationSummary = docu.find('.validation-summary');

    expect(validationSummary.length === 1).to.be.true;
    expect(validationSummary.html())
      .to.match(/Enter a date after 1-1-2010/);
  });

  it('does not pass /when if date entered is not in the past', async () => {
    const URI = '/when';
    await initSession(URI);
    await passStep(URI, {
      'when-date': now.add(1, 'days').format('YYYY-MM-DD')
    });

    const res = await getUrl(URI);
    const docu = await parseHtml(res);
    const validationSummary = docu.find('.validation-summary');

    expect(validationSummary.length === 1).to.be.true;
    expect(validationSummary.html())
      .to.match(/Enter a date in the past/);
  });

  it('goes to /when', async () => {
    const URI = '/when';
    await initSession(URI);
    const response = await passStep(URI, {
      'when-date': '2020-11-22'
    });

    expect(response.text).to.contain('Found. Redirecting to /name');
  });

  it('does not pass /name if field is empty', async () => {
    const URI = '/name';
    await initSession(URI);
    await passStep(URI, {});

    const res = await getUrl(URI);
    const docu = await parseHtml(res);
    const validationSummary = docu.find('.validation-summary');

    expect(validationSummary.length === 1).to.be.true;
    expect(validationSummary.html())
      .to.match(/Tell us your full name/);
  });

  it('goes to /name', async () => {
    const URI = '/name';
    await initSession(URI);
    const response = await passStep(URI, {
      'name-text': 'Jane Doe'
    });

    expect(response.text).to.contain('Found. Redirecting to /email-address');
  });

  it('does not pass /email-address if field is empty', async () => {
    const URI = '/email-address';
    await initSession(URI);
    await passStep(URI, {});

    const res = await getUrl(URI);
    const docu = await parseHtml(res);
    const validationSummary = docu.find('.validation-summary');

    expect(validationSummary.length === 1).to.be.true;
    expect(validationSummary.html())
      .to.match(/Enter an email address/);
  });

  it('does not pass /email-address if email is invalid', async () => {
    const URI = '/email-address';
    await initSession(URI);
    await passStep(URI, {
      'email-text': 'test.com'
    });

    const res = await getUrl(URI);
    const docu = await parseHtml(res);
    const validationSummary = docu.find('.validation-summary');

    expect(validationSummary.length === 1).to.be.true;
    expect(validationSummary.html())
      .to.match(/The email address isn't valid, enter a valid email address/);
  });

  it('goes to /email-address', async () => {
    const URI = '/email-address';
    await initSession(URI);
    const response = await passStep(URI, {
      'email-text': 'test@test.com'
    });

    expect(response.text).to.contain('Found. Redirecting to /country');
  });

  it('does not pass /country if no options selected', async () => {
    const URI = '/country';
    await initSession(URI);
    await passStep(URI, {});

    const res = await getUrl(URI);
    const docu = await parseHtml(res);
    const validationSummary = docu.find('.validation-summary');

    expect(validationSummary.length === 1).to.be.true;
    expect(validationSummary.html())
      .to.match(/Enter your country/);
  });

  it('does not pass /country if a entered country is not on the list', async () => {
    const URI = '/country';
    await initSession(URI);
    await passStep(URI, {
      'country-select': 'Fake Kingdom'
    });

    const res = await getUrl(URI);
    const docu = await parseHtml(res);
    const validationSummary = docu.find('.validation-summary');

    expect(validationSummary.length === 1).to.be.true;
    expect(validationSummary.html())
      .to.match(/Pick a country from the list/);
  });

  it('goes to /country', async () => {
    const URI = '/country';
    await initSession(URI);
    const response = await passStep(URI, {
      'country-select': 'United Kingdom'
    });

    expect(response.text).to.contain('Found. Redirecting to /address');
  });

  it('does not pass /address if building field is empty', async () => {
    const URI = '/address';
    await initSession(URI);
    await passStep(URI, {});

    const res = await getUrl(URI);
    const docu = await parseHtml(res);
    const validationSummary = docu.find('.validation-summary');

    expect(validationSummary.length === 1).to.be.true;
    expect(validationSummary.html())
      .to.match(/Enter details of your building and street/);
  });

  it('does not pass /address if townOrCity is empty', async () => {
    const URI = '/address';
    await initSession(URI);
    await passStep(URI, {
      building: 'Flat 10'
    });

    const res = await getUrl(URI);
    const docu = await parseHtml(res);
    const validationSummary = docu.find('.validation-summary');

    expect(validationSummary.length === 1).to.be.true;
    expect(validationSummary.html())
      .to.match(/Enter a town or city/);
  });

  it('does not pass /address if townOrCity includes digits', async () => {
    const URI = '/address';
    await initSession(URI);
    await passStep(URI, {
      building: 'Flat 10',
      townOrCity: 'London2'
    });

    const res = await getUrl(URI);
    const docu = await parseHtml(res);
    const validationSummary = docu.find('.validation-summary');

    expect(validationSummary.length === 1).to.be.true;
    expect(validationSummary.html())
      .to.match(/Enter a town or city without including digits/);
  });

  it('does not pass /address if countryOrState is empty', async () => {
    const URI = '/address';
    await initSession(URI);
    await passStep(URI, {
      building: 'Flat 10',
      street: 'Fake Street',
      townOrCity: 'London'
    });

    const res = await getUrl(URI);
    const docu = await parseHtml(res);
    const validationSummary = docu.find('.validation-summary');

    expect(validationSummary.length === 1).to.be.true;
    expect(validationSummary.html())
      .to.match(/Enter a county or state/);
  });

  it('does not pass /address if countryOrState includes digits', async () => {
    const URI = '/address';
    await initSession(URI);
    await passStep(URI, {
      building: 'Flat 10',
      street: 'Fake Street',
      townOrCity: 'London',
      countyOrState: 'G8r London'
    });

    const res = await getUrl(URI);
    const docu = await parseHtml(res);
    const validationSummary = docu.find('.validation-summary');

    expect(validationSummary.length === 1).to.be.true;
    expect(validationSummary.html())
      .to.match(/Enter a county or state without including digits/);
  });

  it('does not pass /address if postcodeOrZIPcode is left empty', async () => {
    const URI = '/address';
    await initSession(URI);
    await passStep(URI, {
      building: 'Flat 10',
      street: 'Fake Street',
      townOrCity: 'London',
      countyOrState: 'Greater London'
    });

    const res = await getUrl(URI);
    const docu = await parseHtml(res);
    const validationSummary = docu.find('.validation-summary');

    expect(validationSummary.length === 1).to.be.true;
    expect(validationSummary.html())
      .to.match(/Enter your postcode or ZIP Code/);
  });

  it('goes to /address', async () => {
    const URI = '/address';
    await initSession(URI);
    const response = await passStep(URI, {
      building: 'Flat 10',
      street: 'Fake Street',
      townOrCity: 'London',
      countyOrState: 'Greater London',
      postcodeOrZIPCode: 'N22 9EE'
    });

    expect(response.text).to.contain('Found. Redirecting to /confirm');
  });

  it('shows the summary page', async () => {
    const URI = '/confirm';
    await initSession(URI);
    const res = await getUrl(URI);
    const docu = await parseHtml(res);
    const header = docu.find('header h1');

    header.html().should.match(/Is the information you have given us correct?/);
  });

  it('shows enquiry details ', async () => {
    const URI = '/confirm';
    await initSession(URI);
    const res = await getUrl(URI);
    const docu = await getDom(res);

    const header = getSectionHeaderByText(docu, /Your enquiry details/);

    expect(header).to.not.be.undefined;
  });

  it('shows personal and contact details ', async () => {
    const URI = '/confirm';
    await initSession(URI);
    const res = await getUrl(URI);
    const docu = await getDom(res);

    const header = getSectionHeaderByText(docu, /Your personal and contact details/);

    expect(header).to.not.be.undefined;
  });
});
