const { expect } = require('chai');

describe('part of the journey of a complaint for existing order about a non partnership certificate', () => {
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
      'about-radio': 'other'
    });

    expect(response.text).to.contain('Found. Redirecting to /details');
  });

  it('goes to the details page)', async () => {
    const URI = '/details';
    await initSession(URI);
    const response = await passStep(URI, {
      'details-text': 'Detail of complaint',
      'existing-radio': 'yes',
      'previous-radio': 'no'
    });

    expect(response.text).to.contain('Found. Redirecting to /type');
  });

  it('goes to the type page', async () => {
    const URI = '/type';
    await initSession(URI);
    const response = await passStep(URI, {
      'type-radio': 'adoption'
    });

    expect(response.text).to.contain('Found. Redirecting to /person');
  });

  it('goes to the person page', async () => {
    const URI = '/person';
    await initSession(URI);
    const response = await passStep(URI, {
      'person-text': 'Jane Doe'
    });

    expect(response.text).to.contain('Found. Redirecting to /how');
  });
});
