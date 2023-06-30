import express from 'express';
import {
  addOrderItems,
  getMyOrders,
  getOrderBy_sellerEcomID,
  getOrders,
  updateOrderToDelivered,
  updateOrderToPaid,
  updateOrderToReject
} from '../controllers/orderController.js';
import { protect, seller } from '../middleware/authMiddleware.js';
const router = express.Router();

router.route('/').post(protect, addOrderItems).get(protect, seller);
router.route('/orderList').get(getOrders);
router.route('/myorders').get(protect, getMyOrders);

router.route('/:sellerEcomID').get(getOrderBy_sellerEcomID);
router.route('/:id/pay').put(protect, updateOrderToPaid);
router.route('/:id/accept').post(updateOrderToPaid);
router.route('/:id/reject').post(updateOrderToReject);
router.route('/:id/deliver').put(protect, seller, updateOrderToDelivered);

export default router;
