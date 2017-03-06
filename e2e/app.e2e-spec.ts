import { PinterestClonePage } from './app.po';

describe('pinterest-clone App', () => {
  let page: PinterestClonePage;

  beforeEach(() => {
    page = new PinterestClonePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
