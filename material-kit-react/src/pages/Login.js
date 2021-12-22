import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Stack,
  Grid,
  Paper,
  TextField,
  Typography,
  Container,
  // eslint-disable-next-line no-unused-vars
  Alert
} from '@material-ui/core';
import { userLogin } from 'src/store/action/usersAction';

const useStyle = makeStyles({
  h1: {
    textAlign: 'center'
  }
});

function Login() {
  const classes = useStyle();
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { auth, error } = useSelector((s) => s.users);
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
    onSubmit: (values, {
      resetForm
    }) => {
      dispatch(userLogin(values.email, values.password));
      resetForm({});
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
          <form autoComplete="on" onSubmit={formik.handleSubmit}>
            <Stack spacing={2}>
              <Typography variant="h1" className={classes.h1}>
                Login
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
              {error === 'EMAIL_NOT_FOUND' ? (
                <Typography sx={{ color: '#ba000d' }}>
                  email/password anda salah
                </Typography>
              ) : null}
              <Button
                color="primary"
                type="submit"
                variant="contained"
                fullWidth
              >
                Login
              </Button>
              <Stack
                alignItems="center"
                justifyContent="center"
                direction="row"
              >
                <Typography align="center">Belum punya akun?</Typography>
                <Button
                  onClick={() => {
                    navigate('/signup');
                  }}
                >
                  Sign Up
                </Button>
              </Stack>
            </Stack>
          </form>
        </Paper>
      </Grid>
    </Container>
  );
}

export default Login;
