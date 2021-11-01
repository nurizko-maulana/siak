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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { ruangan, edit } = useSelector((state) => state.master);

  const [ruang, setRuang] = useState('');
  useEffect(() => {
    if (edit) {
      setRuang(ruangan.ruang);
    }
  }, [dispatch, edit, ruangan]);
  function submit(e) {
    e.preventDefault();
    if (edit) {
      const { _id } = ruangan;
      axios
        .put(`${process.env.REACT_APP_API}ruangan/${_id}`, {
          ruang
        })
        .then((res) => {
          console.log(res);
          navigate('/app/master/ruangan');
          dispatch(updateData());
        });
    } else {
      fetch(`${process.env.REACT_APP_API}ruangan`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: new Date().getTime(), ruang })
      }).then((result) => {
        result.json().then((res) => {
          navigate('/app/master/ruangan');
          console.warn('res', res);
        });
      });
    }
  }

  return (
    <form autoComplete="off" noValidate {...props} onSubmit={(e) => submit(e)}>
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
                onChange={(e) => setRuang(e.target.value)}
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
          <Button color="primary" variant="contained" type="submit">
            Save
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default AccountProfileDetails;
