import express from "express";
import { Todo } from '../../model/todoModel';
import { CustomRequest } from "../../Types/CustomRequest";

// @desc  create new todo
// @route Post /todo
// @access Protected
export const postTodos = async (req: CustomRequest, res: express.Response) => {
  const userID = req.user?.userID;

  try {
    if (!req.body.text) {
      res.status(400);
      throw new Error('Please add a text field');
    }

    if (!req.body.time) {
      res.status(400);
      throw new Error('Please add a time field');
    }
  
    const todo = await Todo.create({ ...req.body, completed: false, userID });
  
    res.status(200).json(todo);
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
};