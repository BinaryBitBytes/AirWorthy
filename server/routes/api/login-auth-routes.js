import { createUser, getSingleUser, login } from '../../controllers/user-controller.js';
import { authMiddleware } from "../../utils/middleware/auth.cjs";
const router = require('express').Router()

router.route('/client/src/components/LoginForm.js').post(login).put(authMiddleware, UserActivation)

router.route('/login').post(login)

router.route('${role}').get(authMiddleware, getSingleUser)

router.route('/${role}/:{roleID}').delete(authMiddleware, removeSingleUser)

export default router