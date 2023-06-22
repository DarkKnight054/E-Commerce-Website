import express from 'express';
import { getTransactions, payMoney } from '../controllers/paymentController.js';
const router = express.Router();

router.route('/').post(payMoney);
router.route('/transactions').get(getTransactions);
export default router;
