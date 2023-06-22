import express from 'express';
import {
  authUser,
  getUserBalance,
  registerUser,
  balanceDeposit,
  getUsers,
} from '../controllers/userController.js';
const router = express.Router();

router.route('/').post(registerUser);
router.post('/login', authUser);
router.route('/profile').get(getUserBalance).put(balanceDeposit);

router.route('/profiles').get(getUsers);

export default router;
