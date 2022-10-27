const { ERROR_CODE } = require('../constans/errors');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_CODE.notFound;
  }
}

module.exports = NotFoundError;
