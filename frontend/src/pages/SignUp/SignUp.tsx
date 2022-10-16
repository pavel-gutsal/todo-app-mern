import React from 'react';
import { Link } from 'react-router-dom';
import { SignUpForm } from '../../components/SignUpForm/SignUpForm';
import "./SignUp.scss"

export const SignUp = () => {
  return (
    <div className="SignUp">
      <SignUpForm />
      <h3 className="SignUp__text">
        Already have an account?
        <Link to="/login" className='SignUp__Link'>Log in</Link>
      </h3>
    </div>
  )
}