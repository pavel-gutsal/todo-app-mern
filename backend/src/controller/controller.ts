import { getTodos } from './TodoController/getTodoControllers';
import { postTodos } from './TodoController/postTodoController';
import { deleteTodos } from './TodoController/deleteTodoController';
import { editTodos } from './TodoController/editTodoController';
import { signup } from './UserController/signUpController';
import { login } from './UserController/loginController';
import { getMe } from './UserController/getMeController';

module.exports = { getTodos, postTodos, deleteTodos, editTodos, signup, login, getMe };