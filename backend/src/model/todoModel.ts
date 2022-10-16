import mongoose from "mongoose";

const Schema = mongoose.Schema;

const todoSchema = new Schema({
  text: {
    type: String,
    required: [true, 'Please add a text'],
  },
  time: {
    type: Date,
    required: [true, 'Please add a time'],
  },
  completed: {
    type: Boolean,
    required: [true, 'Please add a completed status'],
  },
  userID: {
    type: Schema.Types.ObjectId,
    required: true,
  }
},{ timestamps: true });

export const Todo = mongoose.model('Todo', todoSchema);