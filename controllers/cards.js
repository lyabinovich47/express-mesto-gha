const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');
// const BadRequestError = require('../errors/bad-request-err');
const {
  // ERROR_CODE,
  // ERROR_NOTFOUND,
  // ERROR_SERVER,
  RES_OK,
  CREATED,
} = require('./status');

const createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(CREATED).send(card))
    .catch(next);
};

// const deleteCard = (req, res) => {
//   Card.findByIdAndDelete(req.params.cardId)
//     .then((card) => {
//       if (card) {
//         res.status(RES_OK).send({ message: 'Пост удален' });
//       } else {
//         res.status(ERROR_NOTFOUND).send({ message: 'Карточка с указанным id не найдена' });
//       }
//     })
//     .catch((err) => {
//       if (err.name === 'CastError') {
//         res.status(ERROR_CODE).send({ message: 'Невалидный идентификатор карточки' });
//       } else {
//         res.status(ERROR_SERVER).send({ message: 'Произошла ошибка' });
//       }
//     });
// };

const deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(() => new NotFoundError('Карточка с указанным id не найдена'))
    .then((card) => {
      if (card.owner._id.toString() !== req.user._id) {
        return next(new ForbiddenError('Вы не можете удалить чужую карточку!'));
      }
      return Card.deleteOne(card)
        .then(() => res.status(200).send({ message: 'Пост удален' }));
    })
    .catch(next);
};

const getCards = (req, res, next) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.status(RES_OK).send(cards))
    // .catch(() => res.status(ERROR_SERVER).send({ message: 'Произошла ошибка' }));
    .catch(next);
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .populate(['owner', 'likes'])
    .then((card) => {
      if (card) {
        res.status(RES_OK).send(card);
      } else {
        // res.status(ERROR_NOTFOUND).send({ message: 'Карточка с указанным id не найдена' });
        next(new NotFoundError('Карточка с указанным id не найдена'));
      }
    })
    .catch(next);
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .populate(['owner', 'likes'])
    .then((card) => {
      if (card) {
        res.status(RES_OK).send(card);
      } else {
        // res.status(ERROR_NOTFOUND).send({ message: 'Карточка с указанным id не найдена' });
        next(new NotFoundError('Карточка с указанным id не найдена'));
      }
    })
    .catch(next);
};

module.exports = {
  deleteCard,
  getCards,
  createCard,
  likeCard,
  dislikeCard,
};
