
describe('Journey of a gro application', () => {
  let testApp;
  let getUrl;
  let initSession;
  let getDom;
  let parseHtml;
  const getSectionHeaderByText = (document, text) => {
    const headers = document.querySelectorAll('h2.section-header');

    return Array(headers.length)
      .fill().map((_, i) => headers[i].textContent).find(header => header.match(text));
  };

  const SUBAPP = 'gro';
  const SUBAPP_PATH = '';
  const STEPS = 'steps';

  describe('Summary', () => {
    before(() => {
      testApp = getSupertestApp(SUBAPP, SUBAPP_PATH);
      getUrl = testApp.getUrl;
      parseHtml = testApp.parseHtml;
      getDom = testApp.getDom;
      initSession = testApp.initSession;
    });

    it('shows the summary page', async () => {
      const URI = '/confirm';
      await initSession(URI, STEPS);
      const res = await getUrl(URI);

      const docu = await parseHtml(res);

      const header = docu.find('header h1');

      header.html().should.match(/Is the information you have given us correct?/);
    });

    it('shows enquiry details ', async () => {
      const URI = '/confirm';
      await initSession(URI, STEPS);
      const res = await getUrl(URI);
      const docu = await getDom(res);

      const header = getSectionHeaderByText(docu, /Your enquiry details/);

      expect(header).to.not.be.undefined;
    });

    it('shows personal and contact details ', async () => {
      const URI = '/confirm';
      await initSession(URI, STEPS);
      const res = await getUrl(URI);
      const docu = await getDom(res);

      const header = getSectionHeaderByText(docu, /Your personal and contact details/);

      expect(header).to.not.be.undefined;
    });
  });
});
