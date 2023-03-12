import { LoginState } from '@/types/login';
import React, { useState } from 'react';

export const useForm = (
  callback: CallableFunction,
  initialState: LoginState
) => {
  const [values, setValues] = useState(initialState);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await callback();
  };

  return {
    onChange,
    onSubmit,
    values
  };
};
