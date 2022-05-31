const { expect } = require('chai');

describe('part of the journey of a query through the marriage/civil partnership route', () => {
  let testApp;
  let passStep;
  let initSession;

  const SUBAPP = 'gro';

  before(() => {
    testApp = getSupertestApp(SUBAPP);
    passStep = testApp.passStep;
    initSession = testApp.initSession;
  });

  it('goes to the about page', async () => {
    const URI = '/about';
    await initSession(URI);
    const response = await passStep(URI, {
      'about-radio': 'refund'
    });

    expect(response.text).to.contain('Found. Redirecting to /type');
  });

  it('goes to the type page', async () => {
    const URI = '/type';
    await initSession(URI);
    const response = await passStep(URI, {
      'type-radio': 'partnership'
    });

    expect(response.text).to.contain('Found. Redirecting to /people');
  });

  it('goes to the people page', async () => {
    const URI = '/people';
    await initSession(URI);
    const response = await passStep(URI, {
      'person-one': 'Jane Doe',
      'person-two': 'Jess Smith'
    });

    expect(response.text).to.contain('Found. Redirecting to /additional');
  });
});
