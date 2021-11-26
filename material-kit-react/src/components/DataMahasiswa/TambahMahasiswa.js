/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
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
  Typography,
  Stack,
  Container
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
    firstName: '',
    lastName: '',
    jenisKelamin: '',
    programStudi: {},
    kelas: {},
    email: '',
    alamat: '',
    jalan: '',
    noTelp: '',
    alamatOrtu: '',
    file: null,
    image: null,
    provinsi: [],
    kabupaten: [],
    kecamatan: [],
    provinsiOrtu: [],
    kabupatenOrtu: [],
    kecamatanOrtu: []
  });

  const [selectedProvince, setProvince] = useState({});
  const [selectedKabupaten, setKabupaten] = useState({});
  const [selectedKecamatan, setKecamatan] = useState({});

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
      form.append('provinsi', selectedProvince.nama);
      form.append('kecamatan', selectedKabupaten.nama);
      form.append('kabupaten', selectedKabupaten.nama);
      axios
        .put(`${process.env.REACT_APP_API}mahasiswa/${mahasiswa._id}`, form, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then((res) => {
          console.log('respon mahasiswa', res);
          navigate('/app/mahasiswa');
          dispatch(updateData());
        });
    } else {
      const form = new FormData(e.target);
      form.append('file', values.file);
      form.append('id_programStudi', values.programStudi._id);
      form.append('id_kelas', values.kelas._id);
      form.append('provinsi', selectedProvince.nama);
      form.append('kecamatan', selectedKabupaten.nama);
      form.append('kabupaten', selectedKabupaten.nama);
      axios
        .post(`${process.env.REACT_APP_API}mahasiswa/`, form, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then((res) => {
          console.log('respon mahasiswa', res);
          // navigate('/app/mahasiswa');
        });
    }
  };

  const getProdi = () => {
    axios.get(`${process.env.REACT_APP_API}programStudi`).then((res) => {
      setProdi(res.data);
      console.log(res);
    });
  };

  const loadProvinsi = () => {
    axios
      .get('https://dev.farizdotid.com/api/daerahindonesia/provinsi')
      .then((res) => {
        handleChangeAutocomplete('provinsi', res.data.provinsi);
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  };

  const loadKabupaten = (id) => {
    console.log('ok kabupaten');
    axios
      .get(
        `https://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi=${id}`
      )
      .then((res) => {
        handleChangeAutocomplete('kabupaten', res.data.kota_kabupaten);
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  };
  const loadKecamatan = (id) => {
    axios
      .get(
        `https://dev.farizdotid.com/api/daerahindonesia/kecamatan?id_kota=${id}`
      )
      .then((res) => {
        handleChangeAutocomplete('kecamatan', res.data.kecamatan);
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  };
  const loadKelas = (id) => {
    axios
      .get(`${process.env.REACT_APP_API}programStudi/${id}`)
      .then((res) => {
        setValues(({ programStudi, ...v }) => ({
          ...v,
          programStudi: {
            ...programStudi,
            id_kelas: res.data[0].kelas
          }
        }));
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  };

  const handleBack = () => {
    console.log('ok');
    dispatch(updateData());
    navigate('/app/mahasiswa');
  };

  useEffect(() => {
    getProdi();
    loadProvinsi();
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
        alamatOrtu: mahasiswa.alamatOrtu,
        jalan: mahasiswa.jalan,
        firstName: mahasiswa.firstName,
        lastName: mahasiswa.lastName,
        image: `${process.env.REACT_APP_API_IMAGE + mahasiswa.foto}`
      }));
      loadKelas(mahasiswa.id_programStudi?._id);
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
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item lg={8} md={9} xs={12}>
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item md={12} xs={12}>
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
                      label="Nama Depan"
                      name="firstName"
                      onChange={handleChange}
                      required
                      value={values.firstName}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="Nama Belakang"
                      name="lastName"
                      onChange={handleChange}
                      required
                      value={values.lastName}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item md={12} xs={12}>
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
                  <Grid item spacing={3} md={12} xs={12}>
                    <Stack direction="row" spacing={2}>
                      <Autocomplete
                        getOptionLabel={(p) => p.nama || ''}
                        disablePortal
                        id="combo-box-demo"
                        options={values.provinsi}
                        value={selectedProvince}
                        isOptionEqualToValue={(opt) =>
                          selectedProvince.id === opt.id
                        }
                        onChange={(event, value) => {
                          if (value === null) {
                            setProvince('');
                          } else {
                            setProvince(value);
                            loadKabupaten(value.id);
                          }
                          setKabupaten('');
                          setKecamatan('');
                        }}
                        sx={{ width: 300, marginBottom: '1em' }}
                        renderInput={(params) => (
                          <TextField {...params} label="Provinsi" />
                        )}
                      />
                      <Autocomplete
                        getOptionLabel={(p) => p.nama || ''}
                        disablePortal
                        value={selectedKabupaten}
                        isOptionEqualToValue={(opt) =>
                          selectedKabupaten.id === opt.id
                        }
                        onChange={(event, value) => {
                          if (value === null) {
                            setKabupaten('');
                          } else {
                            setKabupaten(value);
                            loadKecamatan(value.id);
                          }
                          setKecamatan('');
                        }}
                        id="combo-box-demo"
                        options={values.kabupaten}
                        sx={{ width: 300, marginBottom: '1em' }}
                        renderInput={(params) => (
                          <TextField {...params} label="Kabupaten" />
                        )}
                      />
                      <Autocomplete
                        getOptionLabel={(p) => p.nama || ''}
                        disablePortal
                        id="combo-box-demo"
                        options={values.kecamatan}
                        value={selectedKecamatan}
                        isOptionEqualToValue={(opt) =>
                          selectedKecamatan.id === opt.id
                        }
                        onChange={(event, value) => {
                          if (value === null) {
                            setKecamatan('');
                          } else {
                            setKecamatan(value);
                          }
                        }}
                        sx={{ width: 300, marginBottom: '1em' }}
                        renderInput={(params) => (
                          <TextField {...params} label="Kecamatan" />
                        )}
                      />
                    </Stack>
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <TextField
                      fullWidth
                      label="Jalan"
                      name="jalan"
                      onChange={handleChange}
                      required
                      value={values.jalan}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item md={12} xs={12}>
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
                </Grid>
              </CardContent>
            </Grid>
            <Grid item lg={4} md={6} xs={12}>
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item md={12} xs={12}>
                    <Typography sx={{ py: 1.25 }}>Foto Profil</Typography>
                    {values.image ? (
                      <img
                        alt="foto profil"
                        src={values.image}
                        width="200"
                        height="200"
                      />
                    ) : null}
                    <input
                      onChange={(e) => handleSelectFile(e)}
                      accept="image/*"
                      id="contained-button-file"
                      type="file"
                    />
                  </Grid>
                  <Grid item md={12} xs={12}>
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
                  <Grid item md={12} xs={12}>
                    <FormControl required component="fieldset">
                      <FormLabel component="legend">Gender</FormLabel>
                      <RadioGroup
                        row
                        aria-label="gender"
                        onChange={handleChange}
                        name="jenisKelamin"
                        value={values.jenisKelamin}
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
                  <Grid item md={12} xs={12}>
                    <Autocomplete
                      id="tags-outlined"
                      fullWidth
                      options={listProdi}
                      name="programStudi"
                      getOptionLabel={(option) => option.nama || ''}
                      filterSelectedOptions
                      required
                      value={values?.programStudi}
                      onChange={(e, value) => {
                        handleChangeAutocomplete('programStudi', value);
                        handleChangeAutocomplete('kelas', '');
                        console.log('prodi', value);
                      }}
                      renderInput={(params) => (
                        <TextField {...params} label="Program Studi" />
                      )}
                    />
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <Autocomplete
                      id="tags-outlined"
                      options={(() => {
                        if (
                          values &&
                          values.programStudi &&
                          Object.keys(values.programStudi).length
                        ) {
                          if (edit) {
                            return values.programStudi.id_kelas;
                          }
                          return values.programStudi.kelas;
                        }
                        return [];
                      })()}
                      name="kelas"
                      getOptionLabel={(option) => option.nama || ''}
                      filterSelectedOptions
                      required
                      value={values.kelas}
                      onChange={(e, value) => {
                        handleChangeAutocomplete('kelas', value);
                      }}
                      renderInput={(params) => (
                        <TextField {...params} label="Kelas" />
                      )}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Grid>
          </Grid>
        </Container>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
          <Stack spacing={2} direction="row">
            {edit ? (
              <Button
                color="primary"
                onClick={() => handleBack()
                }
                variant="contained"
              >
                Back
              </Button>
            ) : (
              ''
            )}
            <Button color="primary" type="submit" variant="contained">
              Save
            </Button>
          </Stack>
        </Box>
      </Card>
    </form>
  );
};

export default AccountProfileDetails;
