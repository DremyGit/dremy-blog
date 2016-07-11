const expect = require('chai').expect;
const httpMocks = require('node-mocks-http');
const authMiddleware = require('../../middlewares/auth');
const helper = require('../helper');

describe('Test middlewares/auth', () => {

  describe('Test auth.authorization middleware', ()=> {
    it('should be unauthorized without authorization header', done => {
      const req = httpMocks.createRequest();
      authMiddleware.authorization(req, httpMocks.createResponse(), () => {
        expect(req.auth.isAuth).to.be.false;
        expect(req.auth.message).to.equal('Unauthorized');
        done();
      });
    });
    it('should be error with a wrong authorization header', done => {
      const req = httpMocks.createRequest({
        headers: {
          'Authorization': 'test'
        }
      });
      authMiddleware.authorization(req, httpMocks.createResponse, () => {
        expect(req.auth.isAuth).to.be.false;
        expect(req.auth.message).to.equal('Authorization type error');
        done();
      });
    });
    it('should be authorized with a right token', done => {
      const token = helper.getAdminToken();
      const req = httpMocks.createRequest({
        headers: {
          Authorization: 'Bearer ' + token
        }
      });
      authMiddleware.authorization(req, httpMocks.createResponse, () => {
        expect(req.auth.isAuth).to.be.true;
        expect(req.auth.user.name).to.equal('test');
        done();
      });
    });
    it('should be error with a wrong token', done => {
      const req = httpMocks.createRequest({
        headers: {
          Authorization: 'Bearer ' + 'test'
        }
      });
      authMiddleware.authorization(req, httpMocks.createResponse, () => {
        expect(req.auth.isAuth).to.be.false;
        expect(req.auth.message).to.equal('jwt malformed');
        done();
      });
    });
  });

  describe('Test auth.adminRequire middleware', () => {
    it('should be ok with authorized', done => {
      const req = {auth:{isAuth:true}};
      const res = {};
      authMiddleware.adminRequired(req, res, err => {
        expect(err).to.be.undefined;
        done();
      });
    });
    it('should be an UnauthorizedError with unauthorized', done => {
      const req = {auth:{isAuth:false}};
      const res = {};
      authMiddleware.adminRequired(req, res, err => {
        expect(err.message).to.equal('Unauthorized');
        done();
      });
    });
  });
});