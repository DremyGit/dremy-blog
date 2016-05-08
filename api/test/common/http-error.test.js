'use strict';
const expect = require('chai').expect;
const HttpError = require('../../common/http-error');

describe('Test http-error.js', () => {
  describe('Test 400 BadRequest', () => {
    it('Status code should be 400', () => {
      const error = new HttpError.BadRequestError();
      expect(error).is.a('Error');
      expect(error.statusCode).to.equal(400);
    });
  });

  describe('Test 401 Unauthorized', () => {
    it('Status code should be 401', () => {
      const error = new HttpError.UnauthorizedError();
      expect(error).is.a('Error');
      expect(error.statusCode).to.equal(401);
    });
  });

  describe('Test 403 Forbidden', () => {
    it('Status code should be 403', () => {
      const error = new HttpError.ForbiddenError();
      expect(error).is.a('Error');
      expect(error.statusCode).to.equal(403);
    });
  });

  describe('Test 404 NotFound', () => {
    it('Status code should be 404', () => {
      const error = new HttpError.NotFoundError();
      expect(error).is.a('Error');
      expect(error.statusCode).to.equal(404);
    });
  });

  describe('Test 500 InterServer', () => {
    it('Status code should be 500', () => {
      const error = new HttpError.InterServerError();
      expect(error).is.a('Error');
      expect(error.statusCode).to.equal(500);
    });
  });
});