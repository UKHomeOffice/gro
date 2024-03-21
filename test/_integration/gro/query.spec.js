
describe('Query', () => {
  let testApp;
  let passStep;
  let initSession;

  const SUBAPP = 'gro';
  const SUBAPP_PATH = '';
  const STEPS = 'steps';

  before(() => {
    testApp = getSupertestApp(SUBAPP, SUBAPP_PATH);
    passStep = testApp.passStep;
    initSession = testApp.initSession;
  });

  describe('Non-partnership certificate, complete path', () => {
    it('goes to /about', async () => {
      const URI = '/about';
      await initSession(URI, STEPS);
      const response = await passStep(URI, {
        'order-type': 'pdf-order'
      });

      expect(response.text).to.contain('Found. Redirecting to /contact-reason');
    });

    it('goes to /contact-reason', async () => {
      const URI = '/contact-reason';
      await initSession(URI, STEPS);
      const response = await passStep(URI, {
        'about-radio': 'wrong-certificate'
      });

      expect(response.text).to.contain('Found. Redirecting to /type');
    });

    it('goes to /type', async () => {
      const URI = '/type';
      await initSession(URI, STEPS);
      const response = await passStep(URI, {
        'type-radio': 'birth'
      });

      expect(response.text).to.contain('Found. Redirecting to /person');
    });

    it('goes to /person', async () => {
      const URI = '/person';
      await initSession(URI, STEPS);
      const response = await passStep(URI, {
        'person-text': 'Jane Doe'
      });

      expect(response.text).to.contain('Found. Redirecting to /additional');
    });

    it('goes to /additional', async () => {
      const URI = '/additional';
      await initSession(URI, STEPS);
      const response = await passStep(URI, {
        'additional-names': 'Elizabeth',
        'additional-text': 'Some text',
        'additional-radio': 'yes'
      });

      expect(response.text).to.contain('Found. Redirecting to /how');
    });

    it('goes to how', async () => {
      const URI = '/how';
      await initSession(URI, STEPS);
      const response = await passStep(URI, {
        'how-radio': 'post'
      });

      expect(response.text).to.contain('Found. Redirecting to /which');
    });

    it('goes to /which', async () => {
      const URI = '/which';
      await initSession(URI, STEPS);
      const response = await passStep(URI, {
        'which-radio': 'priority'
      });

      expect(response.text).to.contain('Found. Redirecting to /when');
    });

    it('goes to /when', async () => {
      const URI = '/when';
      await initSession(URI, STEPS);
      const response = await passStep(URI, {
        'when-date': '2020-11-22'
      });

      expect(response.text).to.contain('Found. Redirecting to /name');
    });

    it('goes to /name', async () => {
      const URI = '/name';
      await initSession(URI, STEPS);
      const response = await passStep(URI, {
        'name-text': 'Jane Doe'
      });

      expect(response.text).to.contain('Found. Redirecting to /email-address');
    });

    it('goes to /email-address', async () => {
      const URI = '/email-address';
      await initSession(URI, STEPS);
      const response = await passStep(URI, {
        'email-text': 'test@test.com'
      });

      expect(response.text).to.contain('Found. Redirecting to /check-email');
    });

    it('goes to /check-email', async () => {
      const URI = '/check-email';
      await initSession(URI, STEPS);
      const response = await passStep(URI, {
        'confirm-email': 'yes'
      });

      expect(response.text).to.contain('Found. Redirecting to /country');
    });

    it('goes to /country', async () => {
      const URI = '/country';
      await initSession(URI, STEPS);
      const response = await passStep(URI, {
        'country-select': 'United Kingdom'
      });

      expect(response.text).to.contain('Found. Redirecting to /address');
    });

    it('goes to /address', async () => {
      const URI = '/address';
      await initSession(URI, STEPS);
      const response = await passStep(URI, {
        building: 'Flat 10',
        street: 'Fake Street',
        townOrCity: 'London',
        countyOrState: 'Greater London',
        postcodeOrZIPCode: 'N22 9EE'
      });

      expect(response.text).to.contain('Found. Redirecting to /confirm');
    });
  });

  describe('Partnership certificate', () => {
    it('goes to /about', async () => {
      const URI = '/about';
      await initSession(URI, STEPS);
      const response = await passStep(URI, {
        'order-type': 'pdf-order'
      });

      expect(response.text).to.contain('Found. Redirecting to /contact-reason');
    });

    it('goes to /contact-reason', async () => {
      const URI = '/contact-reason';
      await initSession(URI, STEPS);
      const response = await passStep(URI, {
        'about-radio': 'refund'
      });

      expect(response.text).to.contain('Found. Redirecting to /type');
    });

    it('goes to /type', async () => {
      const URI = '/type';
      await initSession(URI, STEPS);
      const response = await passStep(URI, {
        'type-radio': 'partnership'
      });

      expect(response.text).to.contain('Found. Redirecting to /people');
    });

    it('goes to /people', async () => {
      const URI = '/people';
      await initSession(URI, STEPS);
      const response = await passStep(URI, {
        'person-one': 'Jane Doe',
        'person-two': 'Jess Smith'
      });

      expect(response.text).to.contain('Found. Redirecting to /additional');
    });
  });
});
