const { expect } = require('chai');

describe('part of the journey of a complaint about an exisiting order for a marriage/ civil partnership', () => {
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
      'about-radio': 'complaint'
    });

    expect(response.text).to.contain('Found. Redirecting to /details');
  });

  it('goes to details page', async () => {
    const URI = '/details';
    await initSession(URI);
    const response = await passStep(URI, {
      'details-text': 'Detail of complaint',
      'existing-radio': 'yes',
      'previous-radio': 'no'
    });

    expect(response.text).to.contain('Found. Redirecting to /type');
  });

  it('goes to type page', async () => {
    const URI = '/type';
    await initSession(URI);
    const response = await passStep(URI, {
      'type-radio': 'marriage'
    });

    expect(response.text).to.contain('Found. Redirecting to /people');
  });

  it('goes to people page', async () => {
    const URI = '/people';
    await initSession(URI);
    const response = await passStep(URI, {
      'person-one': 'Jane Doe',
      'person-two': 'Joe Bloggs'
    });

    expect(response.text).to.contain('Found. Redirecting to /how');
  });
});
