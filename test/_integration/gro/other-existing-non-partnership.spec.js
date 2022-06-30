const { expect } = require('chai');

describe('existing other enquiry on an non-partnership certificate', () => {
  // Partial path of users selecting other issues and feedback about an exisiting order on an adoption certificate
  // The same path would occur for other non-partnerschip certificates e.g. birth, death or adoption certificate.
  // Includes validations for the /details page

  let testApp;
  let passStep;
  let getUrl;
  let initSession;
  let parseHtml;

  const SUBAPP = 'gro';

  before(() => {
    testApp = getSupertestApp(SUBAPP);
    getUrl = testApp.getUrl;
    parseHtml = testApp.parseHtml;
    getDom = testApp.getDom;
    passStep = testApp.passStep;
    initSession = testApp.initSession;
  });

  it('goes to /about', async () => {
    const URI = '/about';
    await initSession(URI);
    const response = await passStep(URI, {
      'about-radio': 'other'
    });

    expect(response.text).to.contain('Found. Redirecting to /details');
  });

  it('does not pass /details if field is empty', async () => {
    const URI = '/details';
    await initSession(URI);
    await passStep(URI, {});

    const res = await getUrl(URI);
    const docu = await parseHtml(res);
    const validationSummary = docu.find('.validation-summary');

    expect(validationSummary.length === 1).to.be.true;
    expect(validationSummary.html())
      .to.match(/Tell us about your enquiry/);
  });

  it('does not pass /details if existing-radio is not selected', async () => {
    const URI = '/details';
    await initSession(URI);
    await passStep(URI, {
      'details-text': 'Detail of enquiry'
    });

    const res = await getUrl(URI);
    const docu = await parseHtml(res);
    const validationSummary = docu.find('.validation-summary');

    expect(validationSummary.length === 1).to.be.true;
    expect(validationSummary.html())
      .to.match(/Tell us if your enquiry is about an existing order/);
  });

  it('does not pass /details if previous-radio is not selected', async () => {
    const URI = '/details';
    await initSession(URI);
    await passStep(URI, {
      'details-text': 'Detail of complaint',
      'existing-radio': 'yes'
    });

    const res = await getUrl(URI);
    const docu = await parseHtml(res);
    const validationSummary = docu.find('.validation-summary');

    expect(validationSummary.length === 1).to.be.true;
    expect(validationSummary.html())
      .to.match(/Tell us if you have already enquired about this issue/);
  });

  it('goes to /details)', async () => {
    const URI = '/details';
    await initSession(URI);
    const response = await passStep(URI, {
      'details-text': 'Detail of enquiry',
      'existing-radio': 'yes',
      'previous-radio': 'no'
    });

    expect(response.text).to.contain('Found. Redirecting to /type');
  });

  it('goes to /type', async () => {
    const URI = '/type';
    await initSession(URI);
    const response = await passStep(URI, {
      'type-radio': 'adoption'
    });

    expect(response.text).to.contain('Found. Redirecting to /person');
  });

  it('goes to /person', async () => {
    const URI = '/person';
    await initSession(URI);
    const response = await passStep(URI, {
      'person-text': 'Jane Doe'
    });

    expect(response.text).to.contain('Found. Redirecting to /how');
  });
});
