import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  SvgIcon,
  Autocomplete,
  TextField,
  Paper,
  Stack
} from '@material-ui/core';
import axios from 'axios';
import { DesktopDatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { UserPlus } from 'react-feather';
import { Link } from 'react-router-dom';

const CustomerListToolbar = (props) => {
  const [prodi, setProdi] = useState([]);
  const [values, setValues] = useState({
    kelas: null,
    matkul: null,
    prodi: null,
    from: new Date().getTime(),
    to: new Date().getTime()
  });
  const handleChange = (event, name) => {
    setValues((v) => ({
      ...v,
      [name]: event
    }));
  };
  const getProdi = () => {
    axios.get(`${process.env.REACT_APP_API}programstudi`).then((res) => {
      console.log('prodi', res);
      setProdi(res.data);
    });
  };

  useEffect(() => {
    getProdi();
  }, []);
  return (
    <Box {...props}>
      <Paper sx={{ p: 2 }}>
        <Stack spacing={2}>
          <Stack direction="row" spacing={2}>
            <Autocomplete
              sx={{ width: 300 }}
              id="tags-outlined"
              options={prodi}
              getOptionLabel={(option) => option.nama || ''}
              filterSelectedOptions
              value={values.prodi}
              onChange={(e, value) => {
                handleChange(value, 'prodi');
                handleChange(null, 'kelas');
              }}
              renderInput={(params) => <TextField {...params} label="Prodi" />}
            />
            <Autocomplete
              sx={{ width: 300 }}
              id="tags-outlined"
              options={
                values.prodi && Object.keys(values.prodi).length
                  ? values.prodi.id_kelas
                  : []
              }
              getOptionLabel={(option) => option.nama || ''}
              filterSelectedOptions
              value={values.kelas}
              onChange={(e, value) => {
                handleChange(value, 'kelas');
                handleChange(null, 'matkul');
              }}
              renderInput={(params) => (
                <TextField {...params} label="Kelas" fullWidth />
              )}
            />
            <Autocomplete
              id="tags-outlined"
              sx={{ width: 300 }}
              options={
                values.kelas && Object.keys(values.kelas).length
                  ? values.kelas.id_matakuliah
                  : []
              }
              getOptionLabel={(option) => option.nama || ''}
              filterSelectedOptions
              value={values.matkul}
              onChange={(e, value) => {
                handleChange(value, 'matkul');
              }}
              renderInput={(params) => <TextField {...params} label="Matkul" />}
            />
          </Stack>
          <Stack direction="row" spacing={2}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                label="Dari Tanggal"
                inputFormat="dd/MM/yyyy"
                value={values.from}
                name="from"
                onChange={(e) => handleChange(e, 'from')}
                renderInput={(params) => <TextField {...params} />}
              />
              <DesktopDatePicker
                label="Sampai Tanggal"
                inputFormat="dd/MM/yyyy"
                name="to"
                value={values.to}
                onChange={(e) => handleChange(e, 'to')}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Stack>
          <Stack>
            <Link to="/app/absensi/add">
              <Button color="primary" variant="contained">
                <SvgIcon fontSize="small" color="action">
                  <UserPlus color="white" />
                </SvgIcon>
                &nbsp; Tambah Data
              </Button>
            </Link>
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
};

export default CustomerListToolbar;
