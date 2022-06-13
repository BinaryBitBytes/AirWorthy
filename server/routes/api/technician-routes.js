const router = require('express').Router();

const {
  createUser,
  getSingleUser,
  saveTechnician,
  removeTechnician,
  login,
} = require('../../controllers/user-controller');

// import middleware
const { authMiddleware } = require('../../utils/auth');

// put authMiddleware anywhere we need to send a token for verification of user
router.route('/').post(createUser).put(authMiddleware, saveTechnician);

router.route('/login').post(login);

router.route('/technician').get(authMiddleware, getSingleUser);

router.route('/technician/:technicianId').delete(authMiddleware, removeTechnician);

module.exports = router;
