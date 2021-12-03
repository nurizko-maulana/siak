/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  Autocomplete,
  Stack
} from '@material-ui/core';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { updateData, setAlertTrue } from '../../../store/action/masterAction';
import AlertMessage from '../../AlertMessage';

const AccountProfileDetails = (props) => {
  const [selectedKelas, setKelas] = useState('');
  const [selectedMatkul, setSelectedMataKuliah] = useState([]);
  const [selectedProdi, setSelectedProdi] = useState([]);
  const [matakuliah, setMataKuliah] = useState([]);
  const [prodi, setProdi] = useState([]);
  const [isUpload, setIsUpload] = useState(false);
  const dispatch = useDispatch();
  const { kelas, edit } = useSelector((state) => state.master);
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();

  // eslint-disable-next-line no-unused-vars
  const getProdi = () => {
    axios.get(`${process.env.REACT_APP_API}programstudi`).then((res) => {
      setProdi(res.data);
      console.log('prodi', res);
    });
  };
  const getMataKuliah = () => {
    axios.get(`${process.env.REACT_APP_API}matakuliah`).then((res) => {
      setMataKuliah(res.data);
      console.log(res);
    });
  };
  const handleClickOpen = (data) => {
    dispatch(setAlertTrue(data));
  };

  const initialValues = {
    kelas: '',
    prodi: {},
    matkul: [],
  };

  const validationSchema = Yup.object({
    kelas: Yup.string().required('Required!'),
    prodi: Yup.mixed().required('Required!')
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    // validateOnMount: true,
    onSubmit: (values, onSubmitProps) => {
      setIsUpload(true);
      if (edit) {
        axios
          .put(`${process.env.REACT_APP_API}kelas/${kelas._id}`, {
            nama: values.kelas.trim(),
            id_matakuliah: values.matkul.map((matkul) => matkul._id),
            id_programStudi: values.prodi._id
          })
          .then((res) => {
            console.log(res);
            dispatch(updateData());
            navigate('/app/master/kelas');
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
        console.log({
          id: new Date().getTime(),
          kelas: selectedKelas.trim(),
          matakuliah: selectedMatkul.map((matkul) => matkul._id),
          id_programStudi: selectedProdi._id
        });
        axios
          .post(`${process.env.REACT_APP_API}kelas`, {
            id: new Date().getTime(),
            nama: values.kelas.trim(),
            id_matakuliah: values.matkul.map((matkul) => matkul._id),
            id_programStudi: values.prodi._id
          })
          .then((res) => {
            console.log(res);
            navigate('/app/master/kelas');
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
    getMataKuliah();
    getProdi();
    if (edit) {
      formik.setFieldValue('kelas', kelas.nama);
      formik.setFieldValue('prodi', kelas.id_programStudi);
      formik.setFieldValue('matkul', kelas.id_matakuliah);
    }
  }, []);

  return (
    <form autoComplete="off" {...props} onSubmit={formik.handleSubmit}>
      <Card>
        <CardHeader subheader="Lengkapi Data Berikut" title="Tambah Kelas" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                label="Kelas"
                name="kelas"
                helperText={formik.touched.kelas && formik.errors.kelas ? formik.errors.kelas : ''}
                error={formik.touched.kelas && !!formik.errors.kelas}
                {...formik.getFieldProps('kelas')}
                required
                variant="outlined"
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <Autocomplete
                id="tags-outlined"
                options={prodi}
                getOptionLabel={(option) => option.nama || ''}
                filterSelectedOptions
                onChange={(e, value) => formik.setFieldValue('prodi', value)}
                value={formik.values.prodi}
                onBlur={formik.handleBlur}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    error={formik.touched.prodi && !!formik.errors.prodi}
                    helperText={formik.touched.prodi && formik.errors.prodi ? formik.errors.prodi : ''}
                    label="Program Studi"
                  />
                )}
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <Autocomplete
                multiple
                id="tags-outlined"
                options={matakuliah}
                getOptionLabel={(option) => option.nama || ''}
                filterSelectedOptions
                onChange={(e, value) => formik.setFieldValue('matkul', value)}
                value={formik.values.matkul}
                onBlur={formik.handleBlur}
                renderInput={(params) => (
                  <TextField {...params} requried label="Matakuliah" />
                )}
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
      <AlertMessage message="Kelas sudah terdaftar" />
    </form>
  );
};

export default AccountProfileDetails;
