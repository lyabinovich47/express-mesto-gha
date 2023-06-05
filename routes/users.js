const router = require('express').Router();

const {
  getUser, getUsers, updateProfile, updateAvatar, getUserInfo,
} = require('../controllers/users');

// router.post('/', createUser);
router.get('/me', getUserInfo);
router.get('/:userId', getUser);

router.get('/', getUsers);
router.patch('/me/avatar', updateAvatar);
router.patch('/me', updateProfile);

module.exports = router;
