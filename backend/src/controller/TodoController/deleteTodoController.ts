import express from "express";
import { Todo } from '../../model/todoModel';
import { CustomRequest } from "../../Types/CustomRequest";

// @desc  delete todo by its id
// @route DELETE /todo
// @access Protected 
export const deleteTodos = async (req: CustomRequest, res: express.Response) => {
  const userID  = req.user?.userID;

  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      throw new Error('Todo not found');
    };

    if (userID && `${todo.userID}` !== userID.toString()) {
      throw new Error('Todo belongs to another user')
    }

    await todo.remove();

    res.status(200).json({ id: req.params.id });
  } catch(err) {
    res.status(400).json({ error: err.message })
  }
};