import { createUser, getSingleUser, saveTechnician, removeTechnician, login } from '../../controllers/user-controller'

// import middleware
import { authMiddleware } from '../../utils/middleware/auth.cjs'
//! ^^ problem 5.15.23 4:00am
import express from 'express';

const router = express.Router();
// put authMiddleware anywhere we need to send a token for verification of user
router.route('/').post(createUser).put(authMiddleware, saveTechnician)

router.route('/login').post(login)

router.route('/technician').get(authMiddleware, getSingleUser)

router.route('/technician/:technicianId').delete(authMiddleware, removeTechnician)

export default router
