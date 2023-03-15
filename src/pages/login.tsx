import {
  Divider,
  Typography,
  Box,
  Grid,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Link
} from '@mui/material/';
import Image from 'next/image';
import React, { useCallback, useEffect, useRef } from 'react';
import { useSignUpWithEmailAndPassword } from '@/hooks/useSignup';
import { useRouter } from 'next/router';
import { useSignInWithEmailAndPassword } from '@/hooks/useSignin';

enum Submitter {
  SignIn,
  SignUp
}

export default function Login() {
  const router = useRouter();
  const onLogin = useCallback(() => {
    console.log('successfully signed in');
    router.push('patientportal');
  }, [router]);

  const form: React.MutableRefObject<HTMLFormElement> = useRef();

  const [signUp, signUpState] = useSignUpWithEmailAndPassword();
  const signUpLoading = signUpState.loading;
  const signUpError = signUpState.error;

  const [signIn, signInState] = useSignInWithEmailAndPassword();
  const signInLoading = signInState.loading;
  const signInError = signInState.error;

  useEffect(() => {
    if (signUpState.success || signInState.success) {
      onLogin();
    }
  }, [signUpState.success, signInState.success, onLogin]);

  const onSubmit = useCallback(
    async (submitter: Submitter) => {
      if (signUpLoading) {
        return;
      }

      const data = new FormData(form.current);
      console.log(data);
      const email = data.get('email') as string;
      const password = data.get('password') as string;

      if (submitter == Submitter.SignUp) {
        return signUp(email, password);
      } else {
        return signIn(email, password);
      }
    },
    [signUpLoading, signUp, signIn]
  );

  return (
    <Box
      sx={{
        width: '35%',
        height: '35%',
        marginTop: '5%',
        ml: '35%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: '50px',
        marginBottom: '5%'
      }}
    >
      <Image
        src="/npca.png"
        alt="Next.js Logo"
        width={380}
        height={167}
        priority
      />

      <Box
        sx={{
          margin: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Box
          component="form"
          noValidate
          sx={{ mt: 3 }}
          ref={form}
          onSubmit={(event) => event.preventDefault()}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox required value="allowExtraEmails" color="primary" />
                }
                label={
                  <Typography fontSize="medium" color="black">
                    I accept the &nbsp;
                    <Link href="./login">{'Terms of Service'}</Link> &nbsp;and
                    the&nbsp; <Link href="./login">{'Privacy Policy'}</Link>{' '}
                    &nbsp;of this page.
                  </Typography>
                }
              />
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={signInLoading || signUpLoading}
            type="submit"
            onClick={() => onSubmit(Submitter.SignIn)}
          >
            Sign In
          </Button>
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={signInLoading || signUpLoading}
            type="submit"
            name="action"
            value="up"
            onClick={() => onSubmit(Submitter.SignUp)}
          >
            Sign Up
          </Button>

          <Divider
            sx={{ height: 0.1, width: 1, backgroundColor: 'background.main' }}
          />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
              // backgroundColor: 'primary.light',
            }}
          ></Box>
        </Box>
      </Box>
    </Box>
  );
}
