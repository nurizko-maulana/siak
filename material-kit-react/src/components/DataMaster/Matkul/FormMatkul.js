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
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { updateData, setAlertTrue } from '../../../store/action/masterAction';
import AlertMessage from '../../AlertMessage';

const AccountProfileDetails = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { matkul, edit } = useSelector((state) => state.master);

  const handleClickOpen = (data) => {
    dispatch(setAlertTrue(data));
  };

  const validationSchema = Yup.object({
    kode: Yup.string().required('Required!'),
    matkul: Yup.string().required('Required!'),
    sks: Yup.number().required('Required!')
  });

  const initialValues = {
    kode: '',
    matkul: '',
    sks: '',
  };

  const formik = useFormik({
    initialValues,
    onSubmit: (values, onSubmitProps) => {
      console.log('ok');
      if (edit) {
        const { _id } = matkul;
        axios
          .put(`${process.env.REACT_APP_API}matakuliah/${_id} `, {
            kode: values.kode.trim(),
            nama: values.matkul.trim(),
            sks: values.sks
          })
          .then((res) => {
            console.log(res);
            navigate('/app/master/matkul');
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
          .post(`${process.env.REACT_APP_API}matakuliah`, {
            id: new Date().getTime(),
            kode: values.kode.trim(),
            nama: values.matkul.trim(),
            sks: values.sks
          })
          .then((res) => {
            // console.log(res);
            if (res.status === '412') {
              console.log(res);
              handleClickOpen();
            } else {
              navigate('/app/master/matkul');
              console.warn('res', res);
            }
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
    },
    validationSchema,
    validateOnMount: true,
    enableReinitialization: true
  });

  useEffect(() => {
    if (edit) {
      formik.setFieldValue('matkul', matkul.nama);
      formik.setFieldValue('kode', matkul.kode);
      formik.setFieldValue('sks', matkul.sks);
    }
  }, []);

  // console.log(formik);

  return (
    <form autoComplete="off" {...props} onSubmit={formik.handleSubmit}>
      <Card>
        <CardHeader
          subheader="Lengkapi Data Berikut"
          title="Tambah Matakuliah"
        />
        <Divider />

        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                helperText={formik.touched.kode && formik.errors.kode ? formik.errors.kode : ''}
                error={formik.touched.kode && !!formik.errors.kode}
                type="text"
                label="Kode Matakuliah"
                name="kode"
                {...formik.getFieldProps('kode')}
                required
                variant="outlined"
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                helperText={formik.touched.matkul && formik.errors.matkul ? formik.errors.matkul : ''}
                label="Matakuliah"
                name="matkul"
                {...formik.getFieldProps('matkul')}
                required
                error={formik.touched.matkul && !!formik.errors.matkul}
                variant="outlined"
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                helperText={formik.touched.sks && formik.errors.sks ? formik.errors.sks : ''}
                type="number"
                label="Jumlah SKS"
                name="sks"
                {...formik.getFieldProps('sks')}
                error={formik.touched.sks && !!formik.errors.sks}
                required
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
      <AlertMessage message="Kode kelas sudah terdaftar" />
    </form>
  );
};

export default AccountProfileDetails;
