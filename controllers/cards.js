const Card = require('../models/card');
const {
  ERROR_CODE,
  ERROR_NOTFOUND,
  ERROR_SERVER,
  RES_OK,
} = require('./status');

const createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(RES_OK).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные при создании карточки' });
      } else {
        res.status(ERROR_SERVER).send({ message: 'Произошла ошибка' });
      }
    });
};

const deleteCard = (req, res) => {
  Card.findByIdAndDelete(req.params.cardId)
    .then((card) => {
      if (card) {
        res.status(RES_OK).send({ message: 'Пост удален' });
      } else {
        res.status(ERROR_NOTFOUND).send({ message: 'Карточка с указанным id не найдена' });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_CODE).send({ message: 'Невалидный идентификатор карточки' });
      } else {
        res.status(ERROR_SERVER).send({ message: 'Произошла ошибка' });
      }
    });
};

const getCards = (req, res) => {
  Card.find({})
    .populate('owner')
    .then((cards) => res.status(RES_OK).send(cards))
    .catch(() => res.status(ERROR_SERVER).send({ message: 'Произошла ошибка' }));
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card) {
        res.status(RES_OK).send(card);
      } else (res.status(ERROR_NOTFOUND).send({ message: 'Карточка с указанным id не найдена' }));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_CODE).send({ message: 'Невалидный идентификатор карточки' });
      } else {
        res.status(ERROR_SERVER).send({ message: 'Произошла ошибка' });
      }
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card) {
        res.status(RES_OK).send(card);
      } else (res.status(ERROR_NOTFOUND).send({ message: 'Карточка с указанным id не найдена' }));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_CODE).send({ message: 'Невалидный идентификатор карточки' });
      } else {
        res.status(ERROR_SERVER).send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports = {
  deleteCard,
  getCards,
  createCard,
  likeCard,
  dislikeCard,
};
