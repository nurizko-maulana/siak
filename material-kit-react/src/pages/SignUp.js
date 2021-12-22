import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  Button,
  Stack,
  Grid,
  Paper,
  TextField,
  Typography,
  Container
} from '@material-ui/core';
import { userSignUp } from 'src/store/action/usersAction';

const useStyle = makeStyles({
  h1: {
    textAlign: 'center'
  }
});

function SignUp() {
  const classes = useStyle();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, auth } = useSelector((e) => e.users);
  const validationSchema = Yup.object({
    email: Yup.string().required('Required!').email(),
    password: Yup.string().required('Required!').min(8, 'at least 8 character')
  });
  const initialValues = {
    email: '',
    password: ''
  };
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      dispatch(userSignUp(values.email, values.password));
      navigate('/app/master', { replace: true });
    }
  });
  useEffect(() => {
    if (localStorage.getItem('auth')) {
      console.log('login true');
      navigate('/app/master', { replace: true });
    }
  }, [auth]);
  return (
    <Container sx={{ marginTop: '2em' }}>
      <Grid container justifyContent="center" rowSpacing={1}>
        <Paper
          elevation={3}
          sx={{ padding: '1em', maxWidth: '20em', width: '100%' }}
        >
          <Stack spacing={2}>
            <Typography variant="h1" className={classes.h1}>
              Sign Up
            </Typography>
            <TextField
              required
              fullWidth
              type="email"
              helperText={
                formik.touched.email && formik.errors.email
                  ? formik.errors.email
                  : ''
              }
              error={formik.touched.email && !!formik.errors.email}
              {...formik.getFieldProps('email')}
              label="email"
            />
            <TextField
              required
              fullWidth
              helperText={
                formik.touched.password && formik.errors.password
                  ? formik.errors.password
                  : ''
              }
              error={formik.touched.password && !!formik.errors.password}
              {...formik.getFieldProps('password')}
              label="password"
              type="password"
            />
            {error === 'EMAIL_EXISTS' ? (
              <Typography sx={{ color: '#ba000d' }}>
                email sudah terdaftar
              </Typography>
            ) : null}
            <Button
              color="primary"
              onClick={formik.handleSubmit}
              variant="contained"
              fullWidth
            >
              Sign Up
            </Button>
            <Stack alignItems="center" justifyContent="center" direction="row">
              <Typography align="center">Sudah punya akun?</Typography>
              <Button
                onClick={() => {
                  navigate('/login');
                }}
              >
                Login
              </Button>
            </Stack>
          </Stack>
        </Paper>
      </Grid>
    </Container>
  );
}

export default SignUp;
