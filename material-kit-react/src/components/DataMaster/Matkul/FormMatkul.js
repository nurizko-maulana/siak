import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { updateData } from '../../../store/action/masterAction';

const AccountProfileDetails = (props) => {
  const [selectedMatkul, setMatkul] = useState('');
  const [selectedKodeMatkul, setKodeMatkul] = useState('');
  const [selectedSKS, setSKS] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { matkul, edit } = useSelector((state) => state.master);

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
          id_matakuliah: selectedMatkul
        })
        .then((res) => {
          console.log(res);
          navigate('/app/master/matkul');
          dispatch(updateData());
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
          navigate('/app/master/matkul');
          console.warn('res', res);
        });
    }
  };

  return (
    <form autoComplete="off" noValidate {...props} onSubmit={(e) => submit(e)}>
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
          <Button type="submit" color="primary" variant="contained">
            Save
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default AccountProfileDetails;
