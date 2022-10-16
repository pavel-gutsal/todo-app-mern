import { useState, useEffect } from "react";
import { FormDataSignUpInitState } from "../types/formDataSignUpInitState";
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { registerUser } from '../features/user/userReducer';

interface LocalErrorInitState {
  nameError: string;
  emailError: string;
  passwordError: string;
  otherError: string;
}

const localErrorInitState: LocalErrorInitState = {
  nameError: '',
  emailError: '',
  passwordError: '',
  otherError: '',
}

export const useSignupValidation = () => {
  const [localError, setLocalError] = useState(localErrorInitState);
  const { nameError, emailError, passwordError, otherError } = localError;

  const dispatch = useAppDispatch();
  const { status, error } = useAppSelector(state => state.user);

  useEffect(() => {
    switch (error) {
      case 'User already exists':
        setLocalError(prev => ({ ...prev, emailError: 'User already exists' }));
        break;
      case 'Password is too short':
        setLocalError(prev => ({ ...prev, passwordError: 'Password is too short' }));
        break;
      default:
        if (typeof error === 'string') {
          setLocalError(prev => ({ ...prev, otherError: error }));
        }
        break;
    }
  } ,[error])

  const signup = (formData: FormDataSignUpInitState) => {
    const { name, email, password, repeatPassword } = formData;

    setLocalError(prev => ({ ...localErrorInitState }));

    if (status === "pending") return;

    if (name.trim() === "") {
      setLocalError(prev => ({ ...prev, nameError: 'paste your name' }));
      return;
    }

    if (name.length < 3) {
      setLocalError(prev => ({ ...prev, nameError: 'name is too short' }));
      return;
    }

    if (email.trim() ==="") {
      setLocalError(prev => ({ ...prev, emailError: 'paste your email' }));
      return;
    }

    if (password.trim() ==="" ) {
      setLocalError(prev => ({ ...prev, passwordError: 'paste password' }));
      return;
    }

    if (password !== repeatPassword) {
      setLocalError(prev => ({ ...prev, passwordError: 'passwords do not match' }));
      return;
    }

    dispatch(registerUser({ name, email, password, route: 'signup' }));
  }

  return { signup, nameError, emailError, passwordError, otherError }
}