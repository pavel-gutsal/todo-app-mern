import React from 'react';
import { Link } from 'react-router-dom';
import { LogInForm } from '../../components/LogInForm/LogInForm';
import "./Login.scss";

export const Login = () => {
  return (
    <div className="Login">
      <LogInForm />
      <h3 className="Login__text">
        Don`t have an account?
        <Link to="/signup" className='Login__Link'>Sign Up</Link>
      </h3>
    </div>
  )
}