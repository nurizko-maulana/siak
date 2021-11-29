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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { ruangan, edit } = useSelector((state) => state.master);

  const [ruang, setRuang] = useState('');
  useEffect(() => {
    if (edit) {
      setRuang(ruangan.ruang);
    }
  }, [dispatch, edit, ruangan]);

  const handleClickOpen = (data) => {
    dispatch(setAlertTrue(data));
  };

  function submit(e) {
    e.preventDefault();
    if (edit) {
      const { _id } = ruangan;
      axios
        .put(`${process.env.REACT_APP_API}ruangan/${_id}`, {
          nama: ruang.trim()
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
        });
    } else {
      axios
        .post(`${process.env.REACT_APP_API}ruangan`, {
          nama: ruang.trim()
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
        });
    }
  }
  const handleChange = (e) => {
    setRuang(e.target.value);
  };

  useEffect(() => {
    if (edit) {
      setRuang(ruangan.nama);
    }
  }, []);

  return (
    <form autoComplete="off" {...props} onSubmit={(e) => submit(e)}>
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
                helperText="Masukan Kode Ruangan"
                label="Ruangan"
                name="ruang"
                type="number"
                onChange={handleChange}
                required
                value={ruang}
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
      <AlertMessage message="Ruangan sudah terdaftar" />
    </form>
  );
};

export default AccountProfileDetails;
