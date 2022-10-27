const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const ValidError = require('../errors/valid');
const NotFoundError = require('../errors/notFound');
const ConflictError = require('../errors/conflict');
const { ERROR_TYPE, ERROR_MESSAGE } = require('../constans/errors');

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  console.log('body', req.body);

  // return res.json({hello:"yes"});

  return User.findUserByCredentials(email, password)
    .then((user) => {
      // Создаем token
      const token = jwt.sign(
        { _id: user._id },
        'some-secret-key',
        { expiresIn: '7d' },
      );
      // Храним token в куки
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true,
      });
      res.send({ token }).end();
    })
    .catch(next);
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch(next);
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(ERROR_MESSAGE.notFound);
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === ERROR_TYPE.valid || err.name === ERROR_TYPE.cast) {
        return next(new ValidError(ERROR_MESSAGE.valid));
      }
      return next(err);
    });
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(ERROR_MESSAGE.notFound);
      }
      res.send({ data: user });
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => {
      res.send({
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        email: user.email,
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        return next(new ConflictError(ERROR_MESSAGE.userExists));
      }
      if (err.name === ERROR_TYPE.valid) {
        return next(new ValidError(ERROR_MESSAGE.valid));
      }
      return next(err);
    });
};

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError(ERROR_MESSAGE.notFound);
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === ERROR_TYPE.valid || err.name === ERROR_TYPE.cast) {
        return next(new ValidError(ERROR_MESSAGE.valid));
      }
      return next(err);
    });
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError(ERROR_MESSAGE.notFound);
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === ERROR_TYPE.valid || err.name === ERROR_TYPE.cast) {
        return next(new ValidError(ERROR_MESSAGE.valid));
      }
      return next(err);
    });
};
