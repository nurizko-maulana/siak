import { useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  Stack
} from '@material-ui/core';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { updateData, setAlertTrue } from '../../../store/action/masterAction';
import AlertMessage from '../../AlertMessage';

const AccountProfileDetails = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { ruangan, edit } = useSelector((state) => state.master);
  const handleClickOpen = (data) => {
    dispatch(setAlertTrue(data));
  };

  // eslint-disable-next-line no-unused-vars
  const validationSchema = Yup.object({
    ruanganValue: Yup.string().required('Required!')
  });

  const formik = useFormik({
    initialValues: {
      ruanganValue: ''
    },
    validationSchema,
    validateOnMount: true,
    onSubmit: (values, onSubmitProps) => {
      console.log('ok');
      if (edit) {
        const { _id } = ruangan;
        axios
          .put(`${process.env.REACT_APP_API}ruangan/${_id}`, {
            nama: values.ruanganValue
          })
          .then((res) => {
            console.log(res);
            navigate('/app/master/ruangan');
            dispatch(updateData());
          })
          .catch((err) => {
            console.log(err.response.status);

            if (err.response.status === 412) {
              handleClickOpen();
              console.log('ok');
            }
            onSubmitProps.setSubmitting(false);
          });
      } else {
        axios
          .post(`${process.env.REACT_APP_API}ruangan`, {
            nama: values.ruanganValue
          })
          .then((res) => {
            console.log(res);
            navigate('/app/master/ruangan');
            dispatch(updateData());
          })
          .catch((err) => {
            console.log(err.response.status);

            if (err.response.status === 412) {
              handleClickOpen();
              console.log('ok');
            }
            onSubmitProps.setSubmitting(false);
          });
      }
    }
  });
  useEffect(() => {
    if (edit) {
      // setRuang(ruangan.ruang);
      formik.setFieldValue('ruanganValue', ruangan.ruang);
    }
  }, [dispatch, edit, ruangan]);

  useEffect(() => {
    if (edit) {
      formik.setFieldValue('ruanganValue', ruangan.nama);
    }
  }, []);

  console.log('form values', formik);
  console.log('form error', formik.errors);

  return (
    <form autoComplete="off" {...props} onSubmit={formik.handleSubmit}>
      <Card>
        <CardHeader
          subheader="Lengkapi Data Berikut"
          title={edit ? 'Edit Ruangan' : 'Tambah Ruangan'}
        />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                helperText={formik.touched.ruanganValue && formik.errors.ruanganValue ? formik.errors.ruanganValue : ''}
                label="Ruangan"
                name="ruanganValue"
                type="number"
                {...formik.getFieldProps('ruanganValue')}
                required
                error={formik.touched.ruanganValue && !!formik.errors.ruanganValue}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>

        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
          <Stack direction="row" spacing={2}>
            {edit ? (
              <Button
                color="primary"
                onClick={() => { dispatch(updateData()); navigate(-1); }}
                variant="contained"
              >
                Back
              </Button>
            ) : (
              ''
            )}
            <Button disabled={!formik.isValid || formik.isSubmitting} color="primary" variant="contained" type="submit">
              Save
            </Button>
          </Stack>
        </Box>
      </Card>
      <AlertMessage message="Ruangan sudah terdaftar" />
    </form>
  );
};

export default AccountProfileDetails;
