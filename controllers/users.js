const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const ConflictError = require('../errors/conflict-err');
const BadRequestError = require('../errors/bad-request-err');
const NotFoundError = require('../errors/not-found-err');

const { NODE_ENV, JWT_SECRET } = require('../config');

const {
  RES_OK,
  CREATED,
} = require('./status');

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.status(CREATED).send({
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      email: user.email,
      _id: user._id,
    }))
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError('Данный email уже зарегистрирован'));
      } else if (err.name === 'ValidationError') {
        next(new BadRequestError('При создании пользователя переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

const getUser = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user) {
        res.status(RES_OK).send(user);
      } else {
        // res.status(ERROR_NOTFOUND).send({ message: 'Пользователь по указанному id не найден' });
        next(new NotFoundError('Пользователь по указанному id не найден'));
      }
    })
    .catch(next);
};

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(RES_OK).send(users))
    // .catch(() => res.status(ERROR_SERVER).send({ message: 'Произошла ошибка' }));
    .catch(next);
};

const updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (user) {
        res.status(RES_OK).send(user);
      } else {
        // throw new Error('User not found');
        next(new NotFoundError('Пользователь с указанным id не найден'));
      }
    })
    .catch(next);
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (user) {
        res.status(RES_OK).send(user);
      } else {
        // throw new Error('User not found');
        next(new NotFoundError('Пользователь с указанным id не найден'));
      }
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key', { expiresIn: '7d' });
      res.send({ token });
      // console.log('Аутентификация успешна! Пользователь в переменной user.');
      // res.status(200).send(user);
    })
    .catch((err) => {
      next(err);
    });
};

const getUserInfo = (req, res, next) => {
  // console.log('Запрос данных пользователя');
  User.findById(req.user._id)
    .then((user) => {
      if (user) {
        // res.status(RES_OK).send({ _id: user._id, email: user.email });
        res.status(RES_OK).send(user);
      } else {
        // res.status(ERROR_NOTFOUND).send({ message: 'Пользователь не найден' });
        next(new NotFoundError('Пользователь не найден'));
      }
    })
    .catch(next);
};

module.exports = {
  getUser, getUsers, updateProfile, updateAvatar, getUserInfo, createUser, login,
};
