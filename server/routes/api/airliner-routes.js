import {getAirliner, createAirliner, saveAirliner,removeAirliner , login, createUser, getSingleUser } from '../../controllers/user-controller.js'

import { authMiddleware } from '../../utils/middleware.js'

import express from 'express';

const router = express.Router();

router.route('/').post(createAirliner).put(authMiddleware, getLoginForm)

router.route('/login/ariliner/:airlinerId').post(login, createAirliner)

router.route('/login/airliner').get(authMiddleware, getAirliner)

router.route('/login/airliner/update/:airlinerId').put(authMiddleware, createAirliner)

router.route('./login/airliner/remove/:airlinerId').delete(authMiddleware, removeAirliner)

export default router