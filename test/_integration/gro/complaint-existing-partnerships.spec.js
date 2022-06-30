const { expect } = require('chai');

describe('complaints about an exisiting order for a partnership certificate', () => {
  // Partial path, looking at a complaint about a existing order for a marriage certificate
  // Path also applies to users with an existing complaint for a civil partnership certificate
  // Validations on /details page for a complaint and /people and /how for those selecting the telephone option

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
      'about-radio': 'complaint'
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
      .to.match(/Tell us about your complaint/);
  });

  it('does not pass /details if existing-radio is not selected', async () => {
    const URI = '/details';
    await initSession(URI);
    await passStep(URI, {
      'details-text': 'Detail of complaint'
    });

    const res = await getUrl(URI);
    const docu = await parseHtml(res);
    const validationSummary = docu.find('.validation-summary');

    expect(validationSummary.length === 1).to.be.true;
    expect(validationSummary.html())
      .to.match(/Tell us if your complaint is about an existing order/);
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
      .to.match(/Tell us if you have already complained about this issue/);
  });

  it('goes to /details', async () => {
    const URI = '/details';
    await initSession(URI);
    const response = await passStep(URI, {
      'details-text': 'Detail of complaint',
      'existing-radio': 'yes',
      'previous-radio': 'no'
    });

    expect(response.text).to.contain('Found. Redirecting to /type');
  });

  it('goes to /type', async () => {
    const URI = '/type';
    await initSession(URI);
    const response = await passStep(URI, {
      'type-radio': 'marriage'
    });

    expect(response.text).to.contain('Found. Redirecting to /people');
  });

  it('does not pass /people if field is empty', async () => {
    const URI = '/people';
    await initSession(URI);
    await passStep(URI, {});

    const res = await getUrl(URI);
    const docu = await parseHtml(res);
    const validationSummary = docu.find('.validation-summary');

    expect(validationSummary.length === 1).to.be.true;
    expect(validationSummary.html())
      .to.match(/Enter a full name/);
  });

  it('goes to /people', async () => {
    const URI = '/people';
    await initSession(URI);
    const response = await passStep(URI, {
      'person-one': 'Jane Doe',
      'person-two': 'Joe Bloggs'
    });

    expect(response.text).to.contain('Found. Redirecting to /how');
  });

  it('does not pass /how if telephone is selected and number contains non-digits', async () => {
    const URI = '/how';
    await initSession(URI);
    await passStep(URI, {
      'how-radio': 'telephone',
      'telephone-toggle-text-2': '12nts1113'
    });

    const res = await getUrl(URI);
    const docu = await parseHtml(res);
    const validationSummary = docu.find('.validation-summary');

    expect(validationSummary.length === 1).to.be.true;
    expect(validationSummary.html())
      .to.match(/Account numbers must consist of between 1 and 8 digits/);
  });

  it('does not pass /how if telephone is selected and does not contain 1-8 digits', async () => {
    const URI = '/how';
    await initSession(URI);
    await passStep(URI, {
      'how-radio': 'telephone',
      'telephone-toggle-text-2': '112789572875073457846'
    });

    const res = await getUrl(URI);
    const docu = await parseHtml(res);
    const validationSummary = docu.find('.validation-summary');

    expect(validationSummary.length === 1).to.be.true;
    expect(validationSummary.html())
      .to.match(/Account numbers must consist of between 1 and 8 digits/);
  });

  it('goes to /how', async () => {
    const URI = '/how';
    await initSession(URI);
    const response = await passStep(URI, {
      'how-radio': 'post'
    });

    expect(response.text).to.contain('Found. Redirecting to /which');
  });
});
