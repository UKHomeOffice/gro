const { expect } = require('chai');

describe('complaint on a non-existing order', () => {
  // Partial path or users with a complaint about a non-existing order

  let testApp;
  let passStep;
  let initSession;

  const SUBAPP = 'gro';

  before(() => {
    testApp = getSupertestApp(SUBAPP);
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
