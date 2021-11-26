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
import { updateData, setAlertTrue } from '../../../store/action/masterAction';
import AlertMessage from '../../AlertMessage';

const AccountProfileDetails = (props) => {
  const [selectedKelas, setKelas] = useState('');
  const [selectedMatkul, setSelectedMataKuliah] = useState([]);
  const [selectedProdi, setSelectedProdi] = useState([]);
  const [matakuliah, setMataKuliah] = useState([]);
  const [prodi, setProdi] = useState([]);
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

  const submit = (e) => {
    e.preventDefault();
    if (edit) {
      axios
        .put(`${process.env.REACT_APP_API}kelas/${kelas._id}`, {
          nama: selectedKelas,
          id_matakuliah: selectedMatkul.map((matkul) => matkul._id)
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
        });
    } else {
      console.log({
        id: new Date().getTime(),
        kelas: selectedKelas,
        matakuliah: selectedMatkul.map((matkul) => matkul._id),
        id_programStudi: selectedProdi._id
      });
      axios
        .post(`${process.env.REACT_APP_API}kelas`, {
          id: new Date().getTime(),
          nama: selectedKelas,
          id_matakuliah: selectedMatkul.map((matkul) => matkul._id),
          id_programStudi: selectedProdi._id
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
        });
    }
  };

  useEffect(() => {
    getMataKuliah();
    getProdi();
    if (edit) {
      setKelas(kelas.nama);
      setSelectedProdi(kelas.id_programStudi);
      setSelectedMataKuliah(kelas.id_matakuliah);
      console.log('matkul', selectedMatkul);
    }
  }, []);
  return (
    <form autoComplete="off" {...props} onSubmit={(e) => submit(e)}>
      <Card>
        <CardHeader subheader="Lengkapi Data Berikut" title="Tambah Kelas" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                helperText="Masukan Kelas yang Sesuai"
                label="Kelas"
                name="Kode"
                onChange={(e) => setKelas(e.target.value)}
                required
                value={selectedKelas}
                variant="outlined"
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <Autocomplete
                id="tags-outlined"
                options={prodi}
                getOptionLabel={(option) => option.nama || ''}
                filterSelectedOptions
                value={selectedProdi}
                onChange={(e, value) => {
                  setSelectedProdi(value);
                  console.log('selected prodi', selectedProdi);
                }}
                renderInput={(params) => (
                  <TextField {...params} required label="Program Studi" />
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
                value={selectedMatkul}
                onChange={(e, value) => {
                  setSelectedMataKuliah(value);
                  console.log('selected matkul', selectedMatkul);
                }}
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
            <Button color="primary" variant="contained" type="submit">
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
