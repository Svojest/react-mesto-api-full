const { ERROR_CODE } = require('../constans/errors');

class ValidError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_CODE.badRequest;
  }
}

module.exports = ValidError;
