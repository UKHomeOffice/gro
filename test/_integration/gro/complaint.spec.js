const { expect } = require('chai');

describe('Complaints', () => {
  let testApp;
  let passStep;
  let initSession;

  const SUBAPP = 'gro';
  const SUBAPP_PATH = '';

  before(() => {
    testApp = getSupertestApp(SUBAPP, SUBAPP_PATH);
    passStep = testApp.passStep;
    initSession = testApp.initSession;
  });

  describe('Existing order for a partnership certificate', () => {
    it('goes to /about', async () => {
      const URI = '/about';
      await initSession(URI);
      const response = await passStep(URI, {
        'about-radio': 'complaint'
      });

      expect(response.text).to.contain('Found. Redirecting to /details');
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

    it('goes to /people', async () => {
      const URI = '/people';
      await initSession(URI);
      const response = await passStep(URI, {
        'person-one': 'Jane Doe',
        'person-two': 'Joe Bloggs'
      });

      expect(response.text).to.contain('Found. Redirecting to /how');
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

  describe('Non-existing order', () => {
    it('goes to /about', async () => {
      const URI = '/about';
      await initSession(URI);
      const response = await passStep(URI, {
        'about-radio': 'complaint'
      });

      expect(response.text).to.contain('Found. Redirecting to /details');
    });

    it('goes to /details', async () => {
      const URI = '/details';
      await initSession(URI);
      const response = await passStep(URI, {
        'details-text': 'Detail of complaint',
        'existing-radio': 'no',
        'previous-radio': 'no'
      });

      expect(response.text).to.contain('Found. Redirecting to /name');
    });
  });
});
