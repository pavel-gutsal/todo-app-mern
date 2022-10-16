import React, { useState } from 'react';
import classNames from 'classnames';
import { useAppDispatch } from '../../app/hooks';
import { Todo } from '../../types/Todo';
import { deleteTodoThunk, toggleTodoThunk } from "../../features/todos/todosReducer";
import { User } from '../../types/User';
import "./TodoElement.scss";

type Props = {
  todo: Todo;
  user: User;
}

export const TodoElement: React.FC<Props> = ({ todo, user }) => {
  const [checked, setChecked] = useState<boolean>(todo.completed);
  const dispatch = useAppDispatch();

  const deleteHandler = () => {
    dispatch(deleteTodoThunk({ token: user.token, id: todo._id }));
  }

  const toggleComplete = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(toggleTodoThunk({
      token: user.token,
      id: todo._id,
      completed: !todo.completed,
    }));
    setChecked(prev => !prev);
  }

  return (
    <div className="TodoElement">
      <input
        type="checkbox"
        onChange={toggleComplete}
        checked={checked}
      />
      <div className="TodoElement__wrapper">
        <h3 className={classNames("TodoElement__text", {checked})}>
          {todo.text}
        </h3>
        <h3 className={classNames("TodoElement__text", {checked})}>
          {new Date(todo.time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
        </h3>
      </div>
      <button
        type="button"
        onClick={deleteHandler}
        className='TodoElement__deleteBtn'
      >
        <img
          className='TodoElement__img'
          src="./assets/delete.svg"
          alt="delete"
          />
      </button>
    </div>
  )
}