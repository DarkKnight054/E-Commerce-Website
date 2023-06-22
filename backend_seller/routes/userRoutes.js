import express from 'express';
import {
  authUser,
  getUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  registerUser,
  updateUserProfile,
} from '../controllers/userController.js';
import { seller, protect } from '../middleware/authMiddleware.js';
const router = express.Router();

router.route('/').get(protect, seller, getUsers).post(registerUser);
router.post('/login', authUser);
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router
  .route('/:id')
  .delete(protect, seller, deleteUser)
  .get(protect, seller, getUserById)
  .put(protect, seller, updateUser);

export default router;
