import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { downloadTodoThunk } from "../../features/todos/todosReducer";
import { TodoElement } from "../TodoElement/TodoElement";
import "./TodosList.scss";

export const TodosList = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.user);
  const { todos } = useAppSelector(state => state.todos);

  useEffect(() => {
    if (user && user.token) {
      dispatch(downloadTodoThunk(user.token));
    }
  }, [ user, dispatch ]);

  console.log(todos);

  return (
    <section className="TodosList">
      {
        user && todos && todos.length > 0 && (
          todos.map(el => (
            <TodoElement
              key={el._id}
              todo={el}
              user={user}
            />
          ))
        )
      }
    </section>
  )
};
