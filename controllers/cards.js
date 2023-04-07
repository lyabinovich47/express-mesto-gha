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
        res.status(ERROR_SERVER).send({ message: err.message });
      }
    });
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then(() => res.status(RES_OK).send({ message: 'Пост удален' }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_NOTFOUND).send({ message: 'Карточка с указанным id не найдена' });
      } else {
        res.status(ERROR_SERVER).send({ message: err.message });
      }
    });
};

const getCards = (req, res) => {
  Card.find({})
    .populate('owner')
    .then((cards) => res.status(RES_OK).send(cards))
    .catch((err) => res.status(ERROR_SERVER).send({ message: err.message }));
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.status(RES_OK).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные для постановки лайка' });
      } else if (err.name === 'CastError') {
        res.status(ERROR_NOTFOUND).send({ message: 'Передан несуществующий id карточки' });
      } else {
        res.status(ERROR_SERVER).send({ message: err.message });
      }
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.status(RES_OK).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные для снятия лайка' });
      } else if (err.name === 'CastError') {
        res.status(ERROR_NOTFOUND).send({ message: 'Передан несуществующий id карточки' });
      } else {
        res.status(ERROR_SERVER).send({ message: err.message });
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
