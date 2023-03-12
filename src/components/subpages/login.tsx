'use client';

import React from 'react';
import { useForm } from './useForm';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { LoginState, UserType } from '@/types/login';
import { useRouter } from 'next/router';

export default function Login() {
  const router = useRouter();

  const initialState: LoginState = {
    user_type: UserType.Patient,
    email: '',
    password: ''
  };

  const { onChange, onSubmit, values } = useForm(loginCallback, initialState);

  function loginCallback() {
    console.log('login', values);
    if (values.user_type == UserType.Provider) {
      router.push('/provider/123'); // Needs to be replaced with real id
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <RadioGroup
        aria-labelledby="user-type-radio-button-group"
        defaultValue="Patient"
        name="user_type"
        onChange={onChange}
      >
        <FormControlLabel value="Patient" control={<Radio />} label="Patient" />
        <FormControlLabel
          value="Provider"
          control={<Radio />}
          label="Healthcare Provider"
        />
      </RadioGroup>
      <TextField
        helperText="Input your email"
        name="email"
        id="email"
        label="Email"
        type="email"
        onChange={onChange}
        required
      />
      <TextField
        helperText="Input your password"
        name="password"
        id="password"
        label="Password"
        type="password"
        onChange={onChange}
        required
      />
      <Button type="submit" variant="outlined">
        Login
      </Button>
    </form>
  );
}
