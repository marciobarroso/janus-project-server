import {expect, sinon} from 'helper';

import * as AuthController from 'controllers/AuthController';
import * as AuthService from 'services/AuthService';

describe('AuthController', () => {
  let sandbox, next, response;
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViNjEyMDQ4YTI2ODEzODViZGI5YjdjZCIsImlhdCI6MTUzMzA5MTkxMiwiZXhwIjoxNTMzMTc4MzEyfQ.qL4LXnqCaS0q-h4ngOEM3r0Drb5s03Pl18MP9VY5WZY';

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    next = sandbox.spy();
    response = {
      send: sandbox.spy()
    };

    sandbox.stub(AuthService, 'register').resolves(token);
  });

  afterEach(() => {
    sandbox.restore();
  });

  const request = {
    body: {
      name: 'Juan Perez',
      password: 'soy el tipo',
      email: 'juanperez@gmail.com'
    }
  };

  describe('.register', () => {
    it('call with all data provided', () => {
      return AuthController.register(request, response, next)
        .then(() => {
          expect(next).to.have.been.called;
          expect(response.send).to.have.been.calledWith({auth: true, token});
        });
    });
  });
});
