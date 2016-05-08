'use strict';
class HttpError extends Error {
  constructor(statusCode, name, message) {
    super();
    this.message = message;
    this.name = name;
    this.statusCode = statusCode;
    this.stack = (new Error()).stack;
  }
}

class BadRequestError extends HttpError {
  constructor(message) {
    message = message || 'Bad request';
    super(400, 'BadRequest', message);
  }
}

class UnauthorizedError extends HttpError {
  constructor(message) {
    message = message || 'Unauthorized';
    super(401, 'Unauthorized', message);
  }
}

class ForbiddenError extends HttpError {
  constructor(message) {
    message = message || 'Forbidden';
    super(403, 'Forbidden', message);
  }
}

class NotFoundError extends HttpError {
  constructor(message) {
    message = message || 'Not found';
    super(404, 'NotFound', message);
  }
}

class InterServerError extends HttpError {
  constructor(message) {
    message = message || 'Inter server error';
    super(500, 'InterServerError', message);
  }
}
exports.HttpError = HttpError;
exports.BadRequestError = BadRequestError;
exports.UnauthorizedError = UnauthorizedError;
exports.ForbiddenError = ForbiddenError;
exports.NotFoundError = NotFoundError;
exports.InterServerError = InterServerError;