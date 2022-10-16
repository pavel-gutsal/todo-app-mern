import React, { useState } from 'react';
import { CreateTodoInitState } from '../../types/CreateTodoInitState';
import { useCreateTodo } from '../../customHooks/useCreateTodo';
import "./CreateTodo.scss";

const createTodoInitState: CreateTodoInitState = {
  text: '',
  time: '',
}

export const CreateTodo = () => {
  const [formData, setFormData] = useState(createTodoInitState);
  const { text, time } = formData;
  const { createNewTodo, textError } = useCreateTodo();

  const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const submitHandler = () => {
    createNewTodo(formData);
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submitHandler();
      }}
      className="CreateTodo"
    >
      <input
        placeholder='type Todo ...'
        type="text"
        name="text"
        className="CreateTodo__InputText"
        required
        onChange={changeInput}
        value={text}
      />
      <label className="CreateTodo__Input--wrapper">
        <input
          className="CreateTodo__InputText CreateTodo__InputText--time"
          type="time"
          name="time"
          required
          onChange={changeInput}
          value={time}
        />
        <h3 className='CreateTodo__Time'>What time</h3>
      </label>
      <div className="CreateTodo__btn--wrapper">
        <button
          className='CreateTodo__btn'
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            submitHandler();
          }}
        >
          Add Todo
        </button>
      </div>
    </form>
  )
}