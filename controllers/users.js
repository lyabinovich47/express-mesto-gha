const User = require('../models/user');
const {
  ERROR_CODE,
  ERROR_NOTFOUND,
  ERROR_SERVER,
  RES_OK,
} = require('./status');

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(RES_OK).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные при создании пользователя' });
      } else {
        res.status(ERROR_SERVER).send({ message: err.message });
      }
    });
};

const getUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user) {
        res.status(RES_OK).send(user);
      } else {
        res.status(ERROR_NOTFOUND).send({ message: 'Пользователь по указанному id не найден' });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_CODE).send({ message: 'Передан некорректный id при запросе пользователя' });
      } else {
        res.status(ERROR_SERVER).send({ message: 'Произошла ошибка на сервере' });
      }
    });
};

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(RES_OK).send(users))
    .catch((err) => res.status(ERROR_SERVER).send({ message: err.message }));
};

const updateProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (user) {
        res.status(RES_OK).send(user);
      } else {
        throw new Error('User not found');
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные при обновлении профиля' });
      } else if (err.message === 'User not found') {
        res.status(ERROR_NOTFOUND).send({ message: 'Пользователь c указанным id не найден' });
      } else {
        res.status(ERROR_SERVER).send({ message: err.message });
      }
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (user) {
        res.status(RES_OK).send(user);
      } else {
        throw new Error('User not found');
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные при обновлении аватара' });
      } else if (err.message === 'User not found') {
        res.status(ERROR_NOTFOUND).send({ message: 'Пользователь с указанным id не найден' });
      } else {
        res.status(ERROR_SERVER).send({ message: err.message });
      }
    });
};

module.exports = {
  getUser, getUsers, createUser, updateProfile, updateAvatar,
};
