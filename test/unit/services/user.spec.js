import {expect, sinon} from 'helper';
import bcrypt from 'bcryptjs';

import * as UserService from 'services/UserService';
import User from 'model/User';

describe('UserService', () => {
  let sandbox, stub;

  const name = 'Juan Perez';
  const password = '123456';
  const email = 'juanperez@gmail.com';

  const expected = {
    _id: 84309251085013840123401341,
    name,
    password: bcrypt.hashSync(password, 8),
    email
  };

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    stub = sandbox.stub(User, 'create').resolves(expected);
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('.create', () => {
    it('should create a new user with the provided data', () => {
      return UserService.create(name, password, email)
        .then(user => {
          expect(user.password).to.not.equal(password);
          expect(stub).to.be.called;
          expect(user).to.deep.equal(expected);
        });
    });
  });
});
