import express from "express";
const { signup, login, getMe } = require('../controller/controller');
export const router = express.Router();
import { protect } from '../middleware/authMiddleWare';

router.post('/signup', signup);

router.post('/login', login);

router.get('/me', protect, getMe);