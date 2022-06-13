const router = require('express').Router();

const {
  createUser,
  getSingleUser,
  saveManager,
  removeManager,
  login,
} = require('../../controllers/user-controller');

// import middleware
const { authMiddleware } = require('../../utils/auth');

// put authMiddleware anywhere we need to send a token for verification of user
router.route('/').post(createUser).put(authMiddleware, saveManager);

router.route('/login').post(login);

router.route('/manager').get(authMiddleware, getSingleUser);

router.route('/manager/:managerId').delete(authMiddleware, removeManager);

module.exports = router;
