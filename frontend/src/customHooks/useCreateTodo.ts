import { useState } from "react";
import { createTodoThunk } from '../features/todos/todosReducer'
import { useAppDispatch, useAppSelector } from '../app/hooks';

type formData = {
  time: string;
  text: string;
}

export const useCreateTodo = () => {
  const [textError, setTextError] = useState<null | string>(null);

  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.user);

  const createNewTodo = (formData: formData) => {
    let { text, time } = formData;
    let newTime = new Date();
    if (text.replaceAll(' ', '').trim() ==="" ) {
      setTextError('please fill todo correctly');
      return;
    }

    if (time !== '') {
      const [hours, minutes]= time.split(':').map(el => Number(el))
      newTime.setHours(hours, minutes);
    }

    if (user && user.token) {
      dispatch(createTodoThunk({ text, time: newTime, token: user.token }));
    }
  }

  return { createNewTodo, textError }
}