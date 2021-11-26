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
  Stack
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { updateData, setAlertTrue } from '../../../store/action/masterAction';
import AlertMessage from '../../AlertMessage';

const AccountProfileDetails = (props) => {
  const [selectedMatkul, setMatkul] = useState('');
  const [selectedKodeMatkul, setKodeMatkul] = useState('');
  const [selectedSKS, setSKS] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { matkul, edit } = useSelector((state) => state.master);

  const handleClickOpen = (data) => {
    dispatch(setAlertTrue(data));
  };

  useEffect(() => {
    if (edit) {
      setMatkul(matkul.nama);
      setKodeMatkul(matkul.kode);
      setSKS(matkul.sks);
    }
  }, []);
  const submit = (e) => {
    e.preventDefault();
    if (edit) {
      const { _id } = matkul;
      axios
        .put(`${process.env.REACT_APP_API}matakuliah/${_id} `, {
          kode: selectedKodeMatkul,
          sks: selectedSKS,
          nama: selectedMatkul
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
        });
    } else {
      axios
        .post(`${process.env.REACT_APP_API}matakuliah`, {
          id: new Date().getTime(),
          kode: selectedKodeMatkul,
          nama: selectedMatkul,
          sks: selectedSKS
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
        });
    }
  };

  return (
    <form autoComplete="off" {...props} onSubmit={(e) => submit(e)}>
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
                type="number"
                label="Kode Matakuliah"
                name="Kode"
                onChange={(e) => setKodeMatkul(e.target.value)}
                required
                value={selectedKodeMatkul}
                variant="outlined"
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                label="Matakuliah"
                name="mata kuliah"
                onChange={(e) => setMatkul(e.target.value)}
                required
                value={selectedMatkul}
                variant="outlined"
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                type="number"
                label="Jumlah SKS"
                name="mata kuliah"
                onChange={(e) => setSKS(e.target.value)}
                required
                value={selectedSKS}
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
      <AlertMessage message="Kode kelas sudah terdaftar" />
    </form>
  );
};

export default AccountProfileDetails;
