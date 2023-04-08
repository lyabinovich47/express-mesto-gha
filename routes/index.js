const router = require('express').Router();

const userRoutes = require('./users');
const cardRoutes = require('./cards');

router.use('/users', userRoutes);
router.use('/cards', cardRoutes);
router.use((req, res) => {
  res.statusCode(404).send({ message: 'Страница по указанному пути не найдена' });
});

module.exports = router;
