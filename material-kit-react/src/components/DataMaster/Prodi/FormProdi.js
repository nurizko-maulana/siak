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
  Autocomplete
} from '@material-ui/core';
import { updateData } from '../../../store/action/masterAction';

const AccountProfileDetails = (props) => {
  const [selectedProdi, setProdi] = useState('');
  const [selectedKelas, setKelas] = useState([]);
  const [listKelas, setListKelas] = useState([]);
  const { edit, prodi } = useSelector((state) => state.master);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    if (edit) {
      axios
        .put(`${process.env.REACT_APP_API}programStudi/${prodi._id}`, {
          nama: selectedProdi,
          id_kelas: selectedKelas.map((kelas) => kelas._id)
        })
        .then((res) => {
          console.log(res);
          dispatch(updateData());
          navigate('/app/master/prodi');
        });
    } else {
      console.log({
        id: new Date().getTime,
        nama: selectedProdi,
        id_kelas: selectedKelas.map((kelas) => kelas._id)
      });
      axios
        .post(`${process.env.REACT_APP_API}programStudi`, {
          id: new Date().getTime,
          nama: selectedProdi,
          id_kelas: selectedKelas.map((kelas) => kelas._id)
        })
        .then((res) => {
          console.log(res);
          navigate('/app/master/prodi');
        });
    }
  };

  const getKelas = () => {
    axios.get(`${process.env.REACT_APP_API}kelas`).then((res) => {
      setListKelas(res.data);
    });
  };

  useEffect(() => {
    if (edit) {
      setProdi(prodi.nama);
      setKelas(prodi.id_kelas);
    }
    getKelas();
    console.log('list kelas', listKelas);
  }, []);

  return (
    <form autoComplete="off" noValidate {...props} onSubmit={(e) => submit(e)}>
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
            <Grid item md={12} xs={12}>
              <Autocomplete
                multiple
                id="tags-outlined"
                options={listKelas}
                getOptionLabel={(option) => option.nama || ''}
                filterSelectedOptions
                value={selectedKelas}
                onChange={(e, value) => {
                  setKelas(value);
                  console.log('selected kelas', selectedKelas);
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Kelas" />
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
          <Button color="primary" type="submit" variant="contained">
            Save
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default AccountProfileDetails;
