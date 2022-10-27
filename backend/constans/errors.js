const ERROR_CODE = {
  badRequest: 400,
  unauthorized: 401,
  forbidden: 403,
  notFound: 404,
  conflict: 409,
  internalServerError: 500,
};

const ERROR_MESSAGE = {
  valid: 'Data validation failed',
  cast: 'One or more properties cannot be recognized',
  notFound: 'Not found',
  default: 'Internal server Error',
  unauthorized: 'Invalid username or password',
  userExists: 'The user already exists',
  forbidden: 'Its not your card',
};

const ERROR_TYPE = {
  valid: 'ValidationError',
  cast: 'CastError',
  authorization: 'AuthError',
};
module.exports = {
  ERROR_CODE,
  ERROR_TYPE,
  ERROR_MESSAGE,
};
