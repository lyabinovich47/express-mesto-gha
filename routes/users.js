const router = require('express').Router();

const {
  getUser, getUsers, updateProfile, updateAvatar, getUserInfo,
} = require('../controllers/users');

const { validateUserId } = require('../middlewares/validators');

// router.post('/', createUser);
router.get('/me', getUserInfo);

router.get('/', getUsers);
router.patch('/me/avatar', updateAvatar);
router.patch('/me', updateProfile);
router.get('/:userId', validateUserId, getUser);

module.exports = router;
