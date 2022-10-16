import express from "express";
import { Todo } from '../../model/todoModel';
import { CustomRequest } from "../../Types/CustomRequest";

// @desc  Get todos
// @route GET /todos
// @access Protected
export const getTodos = async (req: CustomRequest, res: express.Response) => {
  const userID = req.user?.userID;

  const todos = await Todo.find({userID});

  res.status(200).json(todos);
};

