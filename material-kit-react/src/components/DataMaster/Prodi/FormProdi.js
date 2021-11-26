/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
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
import { updateData, setAlertTrue } from '../../../store/action/masterAction';
import AlertMessage from '../../AlertMessage';

const AccountProfileDetails = (props) => {
  const [selectedProdi, setProdi] = useState('');
  const [selectedKelas, setKelas] = useState([]);
  const { edit, prodi } = useSelector((state) => state.master);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClickOpen = (data) => {
    dispatch(setAlertTrue(data));
  };

  const submit = (e) => {
    e.preventDefault();
    if (edit) {
      axios
        .put(`${process.env.REACT_APP_API}programStudi/${prodi._id}`, {
          nama: selectedProdi
        })
        .then((res) => {
          console.log(res);
          dispatch(updateData());
          navigate('/app/master/prodi');
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
        id: new Date().getTime,
        nama: selectedProdi
      });
      axios
        .post(`${process.env.REACT_APP_API}programStudi`, {
          id: new Date().getTime,
          nama: selectedProdi
        })
        .then((res) => {
          console.log(res);
          navigate('/app/master/prodi');
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
    if (edit) {
      setProdi(prodi.nama);
    }
  }, []);

  return (
    <form autoComplete="off" {...props} onSubmit={(e) => submit(e)}>
      <Card>
        <CardHeader
          subheader="Lengkapi Data Berikut"
          title={edit ? 'Edit Prodi' : 'Tambah Prodi'}
        />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                helperText="Masukan Nama Prodi"
                label="Program Studi"
                name="Kode"
                onChange={(e) => setProdi(e.target.value)}
                required
                value={selectedProdi}
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
            <Button color="primary" variant="contained" type="submit">
              Save
            </Button>
          </Stack>
        </Box>
      </Card>
      <AlertMessage message="Progamstudi sudah terdaftar" />
    </form>
  );
};

export default AccountProfileDetails;
