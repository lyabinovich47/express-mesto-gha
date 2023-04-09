const router = require('express').Router();
const ERROR_NOTFOUND = require('../controllers/status');

const userRoutes = require('./users');
const cardRoutes = require('./cards');

router.use('/users', userRoutes);
router.use('/cards', cardRoutes);
router.use('*', (req, res) => {
  res.status(ERROR_NOTFOUND).send({ message: 'Страница по указанному пути не найдена' });
});

module.exports = router;
