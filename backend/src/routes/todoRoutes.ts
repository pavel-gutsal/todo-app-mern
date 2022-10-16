import express from "express";
const { getTodos, postTodos, deleteTodos, editTodos } = require('../controller/controller');
export const router = express.Router();
import { protect } from '../middleware/authMiddleWare';

router.get('/', protect, getTodos);

router.post('/', protect, postTodos);

router.delete('/:id', protect, deleteTodos);

router.put('/:id', protect, editTodos);