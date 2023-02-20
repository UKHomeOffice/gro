
const moment = require('moment');

describe('Validation - queries', () => {
  let testApp;
  let passStep;
  let initSession;
  let getUrl;
  let parseHtml;
  let now;

  const SUBAPP = 'gro';
  const SUBAPP_PATH = '';
  const STEPS = 'steps';

  before(() => {
    testApp = getSupertestApp(SUBAPP, SUBAPP_PATH);
    passStep = testApp.passStep;
    initSession = testApp.initSession;
    getUrl = testApp.getUrl;
    parseHtml = testApp.parseHtml;
  });

  beforeEach(() => {
    now = moment();
  });

  describe('Order Type validations', () => {
    it('does not pass the about page if nothing is selected', async () => {
      const URI = '/about';
      await initSession(URI, STEPS);
      await passStep(URI, {});

      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.govuk-error-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/Tell us which type of order you are contacting us about/);
    });
  });

  describe('About validations', () => {
    it('does not pass the about page if nothing is selected', async () => {
      const URI = '/contact-reason';
      await initSession(URI, STEPS);
      await passStep(URI, {});

      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.govuk-error-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/Tell us what you are contacting us about/);
    });
  });

  describe('Type validations', () => {
    it('does not pass the type page if nothing is selected', async () => {
      const URI = '/type';
      await initSession(URI, STEPS);
      await passStep(URI, {});

      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.govuk-error-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/Tell us the type of certificate that was ordered/);
    });
  });

  describe('Person validations', () => {
    it('does not pass /person if field is empty', async () => {
      const URI = '/person';
      await initSession(URI, STEPS);
      await passStep(URI, {});

      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.govuk-error-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/Enter a full name/);
    });
  });

  describe('Additional validations', () => {
    it('does not pass /additional if additional-radio is not selected ', async () => {
      const URI = '/additional';
      await initSession(URI, STEPS);
      await passStep(URI, {});

      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.govuk-error-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/Tell us if you have previously been in contact about this enquiry/);
    });
  });

  describe('How validations', () => {
    it('does not pass /how page if no options selected', async () => {
      const URI = '/how';
      await initSession(URI, STEPS);
      await passStep(URI, {});

      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.govuk-error-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/Tell us how you placed your order/);
    });

    it('does not pass /how if telephone is selected and number contains non-digits', async () => {
      const URI = '/how';
      await initSession(URI, STEPS);
      await passStep(URI, {
        'how-radio': 'telephone',
        'telephone-toggle-text-2': '12nts1113'
      });

      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.govuk-error-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/Account numbers must consist of between 1 and 8 digits/);
    });

    it('does not pass /how if telephone is selected and does not contain 1-8 digits', async () => {
      const URI = '/how';
      await initSession(URI, STEPS);
      await passStep(URI, {
        'how-radio': 'telephone',
        'telephone-toggle-text-2': '112789572875073457846'
      });

      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.govuk-error-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/Account numbers must consist of between 1 and 8 digits/);
    });
  });

  describe('Which validations', () => {
    it('does not pass /which if no options are selected', async () => {
      const URI = '/which';
      await initSession(URI, STEPS);
      await passStep(URI, {});

      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.govuk-error-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/Tell us which service you paid for/);
    });
  });

  describe('When validations', () => {
    it('does not pass /when if field is empty', async () => {
      const URI = '/when';
      await initSession(URI, STEPS);
      await passStep(URI, {});

      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.govuk-error-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/Tell us when you placed your order/);
    });
  });

  describe('When validations', () => {
    it('does not pass /when if date entered is earlier than 2010-01-01', async () => {
      const URI = '/when';
      await initSession(URI, STEPS);
      await passStep(URI, {
        'when-date': '2009-11-22'
      });

      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.govuk-error-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/Enter a date after 1-1-2010/);
    });

    it('does not pass /when if date entered is not in the past', async () => {
      const URI = '/when';
      await initSession(URI, STEPS);
      await passStep(URI, {
        'when-date': now.add(1, 'days').format('YYYY-MM-DD')
      });

      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.govuk-error-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/Enter a date in the past/);
    });
  });

  describe('Name validations', () => {
    it('does not pass /name if field is empty', async () => {
      const URI = '/name';
      await initSession(URI, STEPS);
      await passStep(URI, {});

      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.govuk-error-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/Tell us your full name/);
    });
  });

  describe('Email validations', () => {
    it('does not pass /email-address if field is empty', async () => {
      const URI = '/email-address';
      await initSession(URI, STEPS);
      await passStep(URI, {});

      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.govuk-error-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/Enter an email address/);
    });

    it('does not pass /email-address if email is invalid', async () => {
      const URI = '/email-address';
      await initSession(URI, STEPS);
      await passStep(URI, {
        'email-text': 'test.com'
      });

      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.govuk-error-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/The email address isn't valid, enter a valid email address/);
    });
  });

  describe('Country validations', () => {
    it('does not pass /country if no options selected', async () => {
      const URI = '/country';
      await initSession(URI, STEPS);
      await passStep(URI, {});

      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.govuk-error-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/Enter your country/);
    });

    it('does not pass /country if a entered country is not on the list', async () => {
      const URI = '/country';
      await initSession(URI, STEPS);
      await passStep(URI, {
        'country-select': 'Fake Kingdom'
      });

      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.govuk-error-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/Pick a country from the list/);
    });
  });

  describe('Address validations', () => {
    it('does not pass /address if building field is empty', async () => {
      const URI = '/address';
      await initSession(URI, STEPS);
      await passStep(URI, {});

      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.govuk-error-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/Enter details of your building and street/);
    });

    it('does not pass /address if townOrCity is empty', async () => {
      const URI = '/address';
      await initSession(URI, STEPS);
      await passStep(URI, {
        building: 'Flat 10'
      });

      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.govuk-error-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/Enter a town or city/);
    });

    it('does not pass /address if townOrCity includes digits', async () => {
      const URI = '/address';
      await initSession(URI, STEPS);
      await passStep(URI, {
        building: 'Flat 10',
        townOrCity: 'London2'
      });

      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.govuk-error-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/Enter a town or city without including digits/);
    });

    it('does not pass /address if countryOrState is empty', async () => {
      const URI = '/address';
      await initSession(URI, STEPS);
      await passStep(URI, {
        building: 'Flat 10',
        street: 'Fake Street',
        townOrCity: 'London'
      });

      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.govuk-error-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/Enter a county or state/);
    });

    it('does not pass /address if countryOrState includes digits', async () => {
      const URI = '/address';
      await initSession(URI, STEPS);
      await passStep(URI, {
        building: 'Flat 10',
        street: 'Fake Street',
        townOrCity: 'London',
        countyOrState: 'G8r London'
      });

      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.govuk-error-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/Enter a county or state without including digits/);
    });

    it('does not pass /address if postcodeOrZIPcode is left empty', async () => {
      const URI = '/address';
      await initSession(URI, STEPS);
      await passStep(URI, {
        building: 'Flat 10',
        street: 'Fake Street',
        townOrCity: 'London',
        countyOrState: 'Greater London'
      });

      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.govuk-error-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/Enter your postcode or ZIP Code/);
    });
  });

  describe('People validation', () => {
    it('does not pass /people if field is empty', async () => {
      const URI = '/people';
      await initSession(URI, STEPS);
      await passStep(URI, {});

      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.govuk-error-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/Enter a full name/);
    });
  });
});

describe('Validation - complaints', () => {
  let testApp;
  let passStep;
  let initSession;
  let getUrl;
  let parseHtml;

  const SUBAPP = 'gro';
  const SUBAPP_PATH = '';
  const STEPS = 'steps-complaints';

  before(() => {
    testApp = getSupertestApp(SUBAPP, SUBAPP_PATH, 'pages-complaint');
    passStep = testApp.passStep;
    initSession = testApp.initSession;
    getUrl = testApp.getUrl;
    parseHtml = testApp.parseHtml;
  });

  beforeEach(() => {
    now = moment();
  });

  describe('Details validation', () => {
    it('does not pass /details if field is empty', async () => {
      const URI = '/details';
      await initSession(URI, STEPS);
      await passStep(URI, {});

      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.govuk-error-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/Tell us about your complaint/);
    });

    it('does not pass /details if existing-radio is not selected', async () => {
      const URI = '/details';
      await initSession(URI, STEPS);
      await passStep(URI, {
        'details-text': 'Detail of complaint'
      });

      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.govuk-error-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/Tell us if your complaint is about an existing order/);
    });

    it('does not pass /details if previous-radio is not selected', async () => {
      const URI = '/details';
      await initSession(URI, STEPS);
      await passStep(URI, {
        'details-text': 'Detail of complaint',
        'existing-radio': 'yes'
      });

      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.govuk-error-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/Tell us if you have already complained about this issue/);
    });
  });
});

describe('Validation - other', () => {
  let testApp;
  let passStep;
  let initSession;
  let getUrl;
  let parseHtml;

  const SUBAPP = 'gro';
  const SUBAPP_PATH = '';
  const STEPS = 'steps-complaints';

  before(() => {
    testApp = getSupertestApp(SUBAPP, SUBAPP_PATH, 'pages-other');
    passStep = testApp.passStep;
    initSession = testApp.initSession;
    getUrl = testApp.getUrl;
    parseHtml = testApp.parseHtml;
  });

  beforeEach(() => {
    now = moment();
  });

  describe('Details validation enquiry', () => {
    it('does not pass /details if field is empty', async () => {
      const URI = '/details';
      await initSession(URI, STEPS);
      await passStep(URI, {});

      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.govuk-error-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/Tell us about your enquiry/);
    });

    it('does not pass /details if existing-radio is not selected', async () => {
      const URI = '/details';
      await initSession(URI, STEPS);
      await passStep(URI, {
        'details-text': 'Detail of enquiry'
      });

      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.govuk-error-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/Tell us if your enquiry is about an existing order/);
    });

    it('does not pass /details if previous-radio is not selected', async () => {
      const URI = '/details';
      await initSession(URI, STEPS);
      await passStep(URI, {
        'details-text': 'Detail of enquiry',
        'existing-radio': 'yes'
      });

      const res = await getUrl(URI);
      const docu = await parseHtml(res);
      const validationSummary = docu.find('.govuk-error-summary');

      expect(validationSummary.length === 1).to.be.true;
      expect(validationSummary.html())
        .to.match(/Tell us if you have already enquired about this issue/);
    });
  });
});
