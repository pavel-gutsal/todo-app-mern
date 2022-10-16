import React, { useState } from 'react';
import { FormDataSignUpInitState } from '../../types/formDataSignUpInitState';
import ReactLoading from 'react-loading';
import classNames from 'classnames';
import { useAppSelector } from '../../app/hooks';
import { useSignupValidation } from '../../customHooks/useSignupValidation';
import "./SignUpForm.scss"



const formDataInitState: FormDataSignUpInitState = {
  name: '',
  email: '',
  password: '',
  repeatPassword:'',
}

export const SignUpForm: React.FC = () => {
  const [formData, setFormData] = useState(formDataInitState);
  const { name, email, password, repeatPassword } = formData;
  const { user, status, error } = useAppSelector(state => state.user);
  const {
    signup,
    nameError,
    emailError,
    passwordError,
    otherError,
  } = useSignupValidation();


  const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value.replace(/ /g, '') }))
  }

  const submitHandler = () => {
    signup(formData);
  };

  return (
    <form
      className="SignUpForm"
      onSubmit={(e) =>{
        e.preventDefault();
        submitHandler();
      }}
    >
      <h3 className='SignUpForm__title'>
        Create Account
      </h3>
      <div className="SignUpForm__input-wrapper">
        <label
          className={classNames(
            "SignUpForm__input-border",
            {red: nameError}
          )}
        >
          <img
            className="SignUpForm__icon"
            src="./assets/user.svg"
            alt="user"
          />
          <input
            className="SignUpForm__input"
            name="name"
            placeholder="name"
            required
            onChange={changeInput}
            value={name}
            minLength={3}
            type="text"
            pattern="[a-zA-Z0-9]+"
          />
        </label>
        <p className="SignUpForm__inputError">{nameError}</p>
      </div>
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
            type="password"
            className="SignUpForm__input"
            name="repeatPassword"
            placeholder="repeat password"
            required
            onChange={changeInput}
            value={repeatPassword}
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
          ? ("Sign up") 
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