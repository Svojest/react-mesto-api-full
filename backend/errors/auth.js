const { ERROR_CODE } = require('../constans/errors');

class AuthError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_CODE.unauthorized;
  }
}

module.exports = AuthError;
