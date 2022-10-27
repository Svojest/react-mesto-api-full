const jwt = require('jsonwebtoken');
const AuthError = require('../errors/auth');
const { ERROR_MESSAGE } = require('../constans/errors');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  // Проверка на наличие token в headers
  if (!token) {
    throw new AuthError(ERROR_MESSAGE.unauthorized);
  }

  let payload;
  // Верификация token
  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    throw new AuthError(ERROR_MESSAGE.unauthorized);
  }
  req.user = payload;
  next();
};
