/* eslint-disable operator-linebreak */
/* eslint-disable no-underscore-dangle */
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Autocomplete,
  Typography
} from '@material-ui/core';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { updateData } from '../../store/action/masterAction';

const AccountProfileDetails = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { edit, mahasiswa } = useSelector((state) => state.master);
  const [listProdi, setProdi] = useState([]);
  const [values, setValues] = useState({
    nim: '',
    nik: '',
    nama: '',
    jenisKelamin: '',
    programStudi: {},
    kelas: {},
    email: '',
    alamat: '',
    noTelp: '',
    alamatOrtu: '',
    file: null,
    image: null
  });

  const handleChange = (event) => {
    setValues((v) => ({
      ...v,
      [event.target.name]: event.target.value
    }));
  };
  const handleChangeAutocomplete = (name, value) => {
    setValues((v) => ({
      ...v,
      [name]: value
    }));
  };

  const handleSelectFile = (event) => {
    console.log(event.target.files[0]);
    setValues((v) => ({
      ...v,
      file: event.target.files[0],
      image: URL.createObjectURL(event.target.files[0])
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (edit) {
      const form = new FormData(e.target);
      form.append('file', values.file);
      form.append('id_programStudi', values.programStudi._id);
      form.append('id_kelas', values.kelas._id);
      axios
        .put(`${process.env.REACT_APP_API}mahasiswa/${mahasiswa._id}`, form, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then((res) => {
          console.log('respon mahasiswa', res);
          dispatch(updateData());
          navigate('/app/mahasiswa');
        });
    } else {
      const form = new FormData(e.target);
      form.append('file', values.file);
      form.append('id_programStudi', values.programStudi._id);
      form.append('id_kelas', values.kelas._id);
      axios
        .post(`${process.env.REACT_APP_API}mahasiswa/`, form, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then((res) => {
          console.log('respon mahasiswa', res);
          navigate('/app/mahasiswa');
        });
    }
  };

  const getProdi = () => {
    axios.get(`${process.env.REACT_APP_API}programStudi`).then((res) => {
      setProdi(res.data);
      console.log(res);
    });
  };

  useEffect(() => {
    getProdi();
    if (edit) {
      setValues((v) => ({
        ...v,
        nim: mahasiswa.nim,
        nik: mahasiswa.nik,
        nama: mahasiswa.nama,
        jenisKelamin: mahasiswa.jenisKelamin,
        programStudi: mahasiswa.id_programStudi,
        kelas: mahasiswa.id_kelas,
        email: mahasiswa.email,
        alamat: mahasiswa.alamat,
        noTelp: mahasiswa.noTelp,
        alamatOrtu: mahasiswa.alamatOrtu
      }));
    }
  }, []);

  return (
    <form autoComplete="off" {...props} onSubmit={handleSubmit}>
      <Card>
        <CardHeader
          subheader="Lengkapi Data Berikut"
          title={edit ? 'Edit Data Mahasiswa' : 'Tambah Data Mahasiswa'}
        />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            {/* <Grid item md={6} xs={12}>
              <DropzoneArea
                onChange={(files) => console.log('Files:', files)}
              />
            </Grid> */}
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="NIM"
                name="nim"
                type="number"
                onChange={handleChange}
                required
                value={values.nim}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Nama"
                name="nama"
                onChange={handleChange}
                required
                value={values.nama}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="NIK"
                name="nik"
                type="number"
                onChange={handleChange}
                required
                value={values.nik}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl required component="fieldset">
                <FormLabel component="legend">Gender</FormLabel>
                <RadioGroup
                  row
                  aria-label="gender"
                  onChange={handleChange}
                  name="jenisKelamin"
                >
                  <FormControlLabel
                    value="Laki-laki"
                    control={<Radio />}
                    label="Laki-laki"
                  />
                  <FormControlLabel
                    value="Perempuan"
                    control={<Radio />}
                    label="Perempuan"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <Autocomplete
                id="tags-outlined"
                options={listProdi}
                name="programStudi"
                getOptionLabel={(option) => option.nama || ''}
                filterSelectedOptions
                required
                value={values.programStudi}
                onChange={(e, value) => {
                  handleChangeAutocomplete('programStudi', value);
                  handleChangeAutocomplete('kelas', '');
                  console.log('prodi', e);
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Program Studi" />
                )}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <Autocomplete
                id="tags-outlined"
                options={
                  values.programStudi && Object.keys(values.programStudi).length
                    ? values.programStudi.kelas
                    : []
                }
                name="programStudi"
                getOptionLabel={(option) => option.nama || ''}
                filterSelectedOptions
                disabled={
                  !(
                    values.programStudi &&
                    Object.keys(values.programStudi).length
                  )
                }
                required
                value={values.kelas}
                onChange={(e, value) => {
                  handleChangeAutocomplete('kelas', value);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Kelas"
                    disabled={
                      !(
                        values.programStudi &&
                        Object.keys(values.programStudi).length
                      )
                    }
                  />
                )}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Email "
                name="email"
                type="email"
                onChange={handleChange}
                required
                value={values.email}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                required
                label="Nomor Telpon"
                name="noTelp"
                onChange={handleChange}
                type="number"
                value={values.noTelp}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Alamat"
                name="alamat"
                required
                onChange={handleChange}
                value={values.alamat}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Alamat Orang Tua"
                name="alamatOrtu"
                required
                onChange={handleChange}
                value={values.alamatOrtu}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <Typography sx={{ py: 1.25 }}>Foto Profil</Typography>
              <input
                onChange={(e) => handleSelectFile(e)}
                accept="image/*"
                id="contained-button-file"
                multiple
                type="file"
              />
              {values.image ? (
                <img
                  alt="foto profil"
                  src={values.image}
                  width="200"
                  height="200"
                  style={{ display: 'block', paddingTop: 12 }}
                />
              ) : null}
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
          <Button color="primary" type="submit" variant="contained">
            Save
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default AccountProfileDetails;
