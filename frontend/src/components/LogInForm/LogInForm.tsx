import React, { useState } from 'react';
import { FormDataLoginInitState } from '../../types/FormDataLoginInitState';
import ReactLoading from 'react-loading';
import classNames from 'classnames';
import { useAppSelector } from '../../app/hooks';
import { useLoginValidation } from '../../customHooks/useLoginValidation';
import "../SignUpForm/SignUpForm.scss"

const formDataInitState: FormDataLoginInitState = {
  email: '',
  password: '',
}

export const LogInForm: React.FC = () => {
  const [formData, setFormData] = useState(formDataInitState);
  const { email, password } = formData;
  const { status } = useAppSelector(state => state.user);
  const {
    login,
    emailError,
    passwordError,
    otherError,
  } = useLoginValidation();


  const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value.replace(/ /g, '') }))
  }

  const submitHandler = () => {
    login(formData);
  }

  return (
    <form
      className="SignUpForm"
      onSubmit={(e) =>{
        e.preventDefault();
        submitHandler();
      }}
    >
      <h3 className='SignUpForm__title'>
        Welcome Back!
      </h3>
      <div className="SignUpForm__input-wrapper">
        <label
          className={classNames(
            "SignUpForm__input-border",
            {red: emailError}
          )}
        >
          <img
            className="SignUpForm__icon"
            src="./assets/mail.svg"
            alt="email"
          />
          <input
            className="SignUpForm__input"
            name="email"
            type="email"
            placeholder="email"
            required
            onChange={changeInput}
            value={email}
            minLength={6}
          />
        </label>
        <p className="SignUpForm__inputError">{emailError}</p>
      </div>
      <div className="SignUpForm__input-wrapper">
        <label
          className={classNames(
            "SignUpForm__input-border",
            {red: passwordError}
          )}
        >
          <img
            className="SignUpForm__icon"
            src="./assets/lock.svg"
            alt="lock"
          />
          <input
            className="SignUpForm__input"
            type="password"
            name="password"
            placeholder="password"
            required
            onChange={changeInput}
            value={password}
            minLength={1}
          />
        </label>
        <p className="SignUpForm__inputError">{passwordError}</p>
      </div>
      <button
        type="submit"
        className='SignUpForm__btn'
        onClick={(e) => {
          e.preventDefault();
          submitHandler()
        }}
      >
        {
          status !== 'pending' 
          ? ("Log In") 
          : (<ReactLoading type={'spin'} color={'white'} height={35} width={35} />)
        }
      </button>
      {
        otherError && (
          <p className="SignUpForm__otherError">{otherError}</p>
        )
      }
    </form>
  )
}