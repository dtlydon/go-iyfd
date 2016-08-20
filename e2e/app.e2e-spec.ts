import { IyfdPage } from './app.po';

describe('iyfd App', function() {
  let page: IyfdPage;

  beforeEach(() => {
    page = new IyfdPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
