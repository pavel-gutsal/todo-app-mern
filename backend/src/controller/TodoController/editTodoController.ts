import express from "express";
import { Todo } from '../../model/todoModel';
import { CustomRequest } from "../../Types/CustomRequest";

// @desc edit todo
// @route PUT /todo/:id
// @access Protected
export const editTodos = async (req: CustomRequest, res: express.Response) => {
  const userID = req.user?.userID;

  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      throw new Error('Todo not found');
    }

    if (userID && `${todo.userID}` !== userID.toString()) {
      throw new Error('Todo belongs to another user')
    }

    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true })
  
    res.status(200).json(updatedTodo);
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
};