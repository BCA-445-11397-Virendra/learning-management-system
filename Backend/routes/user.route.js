import express from 'express';
import { getUserProfile, login, logout, register, updateProfileUser } from '../controllers/user.controller.js';
import isAuthenticated from '../middleware/isAuthenticated.js';
import upload from '../utils/multer.js';
const router = express();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').get(logout);
router.route('/profile').get(isAuthenticated , getUserProfile);
router.route('/update').put(isAuthenticated ,upload.single("profileUrl"),updateProfileUser);

export default router;