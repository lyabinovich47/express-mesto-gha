const router = require('express').Router();
const {
  deleteCard,
  getCards,
  createCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

const { validateCardBody, validateCardId } = require('../middlewares/validators');

router.post('/', validateCardBody, createCard);
router.delete('/:cardId', validateCardId, deleteCard);
router.get('/', getCards);
router.put('/:cardId/likes', validateCardId, likeCard);
router.delete('/:cardId/likes', validateCardId, dislikeCard);

module.exports = router;
