import {expect, sinon} from 'helper';

import App from 'core/App';

describe('App', () => {
  it('should export a default module', () => {
    expect(App).to.be.a('function');
  });
})
