import { useState, useEffect } from "react";
import { FormDataLoginInitState } from "../types/FormDataLoginInitState";
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { registerUser } from '../features/user/userReducer'; //

interface LocalErrorInitState {
  emailError: string;
  passwordError: string;
  otherError: string;
}

const localErrorInitState: LocalErrorInitState = {
  emailError: '',
  passwordError: '',
  otherError: '',
}

export const useLoginValidation = () => {
  const [localError, setLocalError] = useState(localErrorInitState);
  const { emailError, passwordError, otherError } = localError;

  const dispatch = useAppDispatch();
  const { status, error } = useAppSelector(state => state.user);

  useEffect(() => {
    switch (error) {
      case 'user not found':
        setLocalError(prev => ({ ...prev, emailError: 'user not found' }));
        break;
      case 'wrong password or email':
        setLocalError(prev => ({ ...prev, passwordError: 'wrong password or email' }));
        break;
      default:
        if (typeof error === 'string') {
          setLocalError(prev => ({ ...prev, otherError: error }));
        }
        break;
    }
  } ,[error]);

  const login = (formData: FormDataLoginInitState) => {
    const { email, password } = formData;

    setLocalError(prev => ({ ...localErrorInitState }));

    if (status === "pending") return;

    if (email.trim() ==="") {
      setLocalError(prev => ({ ...prev, emailError: 'paste your email' }));
      return;
    }

    if (password.trim() ==="" ) {
      setLocalError(prev => ({ ...prev, passwordError: 'paste password' }));
      return;
    }

    dispatch(registerUser({ email, password, route: 'login' }));//
  }

  return { login, emailError, passwordError, otherError }
}