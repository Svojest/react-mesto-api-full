const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const userRouter = require('./users');
const cardRouter = require('./cards');
const auth = require('../middlewares/auth');

const NotFoundError = require('../errors/notFound');
const { createUser, login } = require('../controllers/users');
const { REGEX_URL } = require('../constans/regex');
const { ERROR_MESSAGE } = require('../constans/errors');

router.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  }),
  login,
);

router.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().regex(REGEX_URL),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  }),
  createUser,
);

router.use(auth);
router.use('/cards', cardRouter);
router.use('/users', userRouter);

router.use((req, res, next) => {
  next(new NotFoundError(ERROR_MESSAGE.notFound));
});

module.exports = router;
