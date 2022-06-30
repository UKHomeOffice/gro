const { expect } = require('chai');

describe('query on a partnership certificate', () => {
  // Partial path, looking at a query for a refund on a civil partnership certificate
  // Path also applies to all query options below:
  // certificate not recieved, wrong certificate, poor quality certificate or refund query
  // on a partnership certificate e.g. Marraige or Civil Partnership.

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
      'about-radio': 'refund'
    });

    expect(response.text).to.contain('Found. Redirecting to /type');
  });

  it('goes to /type', async () => {
    const URI = '/type';
    await initSession(URI);
    const response = await passStep(URI, {
      'type-radio': 'partnership'
    });

    expect(response.text).to.contain('Found. Redirecting to /people');
  });

  it('goes to /people', async () => {
    const URI = '/people';
    await initSession(URI);
    const response = await passStep(URI, {
      'person-one': 'Jane Doe',
      'person-two': 'Jess Smith'
    });

    expect(response.text).to.contain('Found. Redirecting to /additional');
  });
});
