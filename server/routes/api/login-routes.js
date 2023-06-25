import {getLoginForm, createLoginForm, login, createUser, getSingleUser } from '../../controllers/user-controller.js'

import { authMiddleware } from '../../utils/middleware.js'

const router = require('express').Router()

router.route('/').post(createUser).put(authMiddleware, getLoginForm)

router.route('/login').post(login)

router.route('/login/user').get(authMiddleware, createLoginForm)

router.route('/login/user/update/:userId').put(authMiddleware, updateUser)

router.route('./login/user/remove/:userId').delete(authMiddleware, removeUser)

export default router