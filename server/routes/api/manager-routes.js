
import { createUser, getSingleUser, saveManager, removeManager, login } from '../../controllers/user-controller';

// import middleware
import { authMiddleware } from '../../utils/middleware/auth.cjs';
//! ^^ problem 5.15.23 4:00am
const router = require('express').Router();
// put authMiddleware anywhere we need to send a token for verification of user
router.route('/').post(createUser).put(authMiddleware, saveManager);

router.route('/login').post(login);

router.route('/manager').get(authMiddleware, getSingleUser);

router.route('/manager/:managerId').delete(authMiddleware, removeManager);

export default router;
