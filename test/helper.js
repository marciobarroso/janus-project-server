import chai, {expect} from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';
import mongoose from 'mongoose';
import sinonChai from 'sinon-chai';

require('sinon-mongoose');

chai.use(sinonChai);
chai.use(chaiAsPromised);

export {
  chai,
  sinon,
  mongoose,
  expect
};
