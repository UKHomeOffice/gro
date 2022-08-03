const { expect } = require('chai');

describe('Other issues and feedback', () => {
  let testApp;
  let passStep;
  let initSession;

  const SUBAPP = 'gro';
  const SUBAPP_PATH = '';
  const STEPS = 'steps-complaints';

  before(() => {
    testApp = getSupertestApp(SUBAPP, SUBAPP_PATH);
    passStep = testApp.passStep;
    initSession = testApp.initSession;
  });

  describe('Existing order on a non-partnership certificate', () => {
    it('goes to /about', async () => {
      const URI = '/about';
      await initSession(URI, STEPS);
      const response = await passStep(URI, {
        'about-radio': 'other'
      });

      expect(response.text).to.contain('Found. Redirecting to /details');
    });

    it('goes to /details)', async () => {
      const URI = '/details';
      await initSession(URI, STEPS);
      const response = await passStep(URI, {
        'details-text': 'Detail of enquiry',
        'existing-radio': 'yes',
        'previous-radio': 'no'
      });

      expect(response.text).to.contain('Found. Redirecting to /type');
    });

    it('goes to /type', async () => {
      const URI = '/type';
      await initSession(URI, STEPS);
      const response = await passStep(URI, {
        'type-radio': 'adoption'
      });

      expect(response.text).to.contain('Found. Redirecting to /person');
    });

    it('goes to /person', async () => {
      const URI = '/person';
      await initSession(URI, STEPS);
      const response = await passStep(URI, {
        'person-text': 'Jane Doe'
      });

      expect(response.text).to.contain('Found. Redirecting to /how');
    });
  });
});
