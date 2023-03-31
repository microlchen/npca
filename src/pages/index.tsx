import {
  Divider,
  Typography,
  Box,
  Grid,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Link,
  FormControl
} from '@mui/material/';
import Image from 'next/image';
import nookies from 'nookies';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSignUpWithEmailAndPassword } from '@/hooks/useSignup';
import { useRouter } from 'next/router';
import { useSignInWithEmailAndPassword } from '@/hooks/useSignin';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { getServerLoggedIn } from '@/data/user';
import { getAdminAuth } from '@/firebase/initFirebaseAdmin';
import { red } from '@mui/material/colors';

enum Submitter {
  SignIn,
  SignUp
}

function Loading() {
  return (
    <div className="splash-screen">
      Signing in.
      <div className="loading-dot">.</div>
    </div>
  );
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const cookies = nookies.get(ctx);
  const adminAuth = getAdminAuth();

  const user = await getServerLoggedIn(cookies, adminAuth);

  return {
    props: {
      isLoggedIn: user.isLoggedIn
    }
  };
};

export default function Login({
  isLoggedIn
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  const onLogin = useCallback(() => {
    console.log('successfully signed in');
    router.push('patientportal');
  }, [router]);

  const form: React.MutableRefObject<HTMLFormElement> = useRef();
  const checkboxRef: React.MutableRefObject<HTMLInputElement> = useRef();

  const [signUp, signUpState] = useSignUpWithEmailAndPassword();
  const signUpLoading = signUpState.loading;
  const signUpError = signUpState.error;

  const [signIn, signInState] = useSignInWithEmailAndPassword();
  const signInLoading = signInState.loading;
  const signInError = signInState.error;
  const [termsOfServiceCheckbox, updateTermsofServiceCheckbox] =
    useState(false);

  const [emailValidation, updateEmailValidation] = useState(false);
  const [passwordValidation, updatePasswordValidation] = useState(false);
  const [TOSValidation, updateTOSValidation] = useState(false);

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
      const email = data.get('email') as string;
      const password = data.get('password') as string;
      let error = false;

      if (!email) {
        updateEmailValidation(true);
        console.log('Email validation bad');
        error = true;
      }
      if (!password) {
        updatePasswordValidation(true);
        console.log('Email password bad');
        error = true;
      }

      if (!termsOfServiceCheckbox) {
        updateTOSValidation(true);
        console.log('Checkbox bad');
        error = true;
      }

      if (!error) {
        if (submitter == Submitter.SignUp) {
          return signUp(email, password);
        } else {
          console.log('signin');
          return signIn(email, password);
        }
      } else {
        console.log('Error');
      }
    },
    [signUpLoading, signUp, signIn, termsOfServiceCheckbox]
  );

  useEffect(() => console.log(signInError), [signInError]);

  // Login if login cached
  useEffect(() => {
    if (isLoggedIn) {
      onLogin();
    }
  });

  return !isLoggedIn ? (
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
      <Box sx={{ mt: '7%' }}>
        <Image
          src="/Mindscope (3).png"
          alt="Next.js Logo"
          width={452}
          height={153}
          priority
        />
      </Box>

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
                error={
                  emailValidation ||
                  signUpError != undefined ||
                  signInError != undefined
                }
                onChange={() => {
                  updateEmailValidation(false);
                }}
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
                error={
                  passwordValidation ||
                  signUpError != undefined ||
                  signInError != undefined
                }
                onChange={() => {
                  updatePasswordValidation(false);
                }}
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
              <FormControl required>
                <FormControlLabel
                  control={
                    <Checkbox
                      required
                      ref={checkboxRef}
                      sx={{
                        color: TOSValidation ? red[800] : undefined,
                        '&.Mui-checked': {
                          color: TOSValidation ? red[600] : undefined
                        }
                      }}
                      onChange={(value) => {
                        updateTermsofServiceCheckbox(value.target.checked);
                        updateTOSValidation(false);
                      }}
                      name="termsOfServiceCheckbox"
                      id="termsOfServiceCheckbox"
                      color="primary"
                    />
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
              </FormControl>
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
  ) : (
    <Loading />
  );
}
