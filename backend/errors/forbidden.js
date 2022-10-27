const { ERROR_CODE } = require('../constans/errors');

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_CODE.forbidden;
  }
}

module.exports = ForbiddenError;
