const router = require('express').Router();

const ERROR_NOTFOUND = 404;

const userRoutes = require('./users');
const cardRoutes = require('./cards');

const { createUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth');

router.post('/signup', createUser);
router.post('/signin', login);

router.use(auth);

router.use('/users', userRoutes);
router.use('/cards', cardRoutes);
router.use('*', (req, res) => {
  res.status(ERROR_NOTFOUND).send({ message: 'Страница по указанному пути не найдена' });
});

module.exports = router;
