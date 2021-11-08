import React from 'react';
import {
  CardContent,
  Grid,
  TextField,
  Autocomplete,
  Stack
} from '@material-ui/core';
import PropTypes from 'prop-types';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import idLocale from 'date-fns/locale/id';
import TimePicker from '@mui/lab/TimePicker';

function FormCardContent({ prodi, handleChange, values }) {
  return (
    <CardContent>
      <Grid container spacing={3}>
        <Grid item md={6} xs={12}>
          <Autocomplete
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
        </Grid>
        <Grid item md={6} xs={12}>
          <Autocomplete
            id="tags-outlined"
            options={
              values.prodi && Object.keys(values.prodi).length
                ? values.prodi.kelas
                : []
            }
            getOptionLabel={(option) => option.nama || ''}
            filterSelectedOptions
            value={values.kelas}
            onChange={(e, value) => {
              handleChange(value, 'kelas');
              handleChange(null, 'matkul');
              handleChange(value.mahasiswa, 'mahasiswa');
              console.log('selected kelas', value);
            }}
            renderInput={(params) => (
              <TextField {...params} label="Kelas" fullWidth />
            )}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <Autocomplete
            id="tags-outlined"
            options={
              values.kelas && Object.keys(values.kelas).length
                ? values.kelas.matakuliah
                : []
            }
            getOptionLabel={(option) => option.nama || ''}
            filterSelectedOptions
            value={values.matkul}
            onChange={(e, value) => {
              handleChange(value, 'matkul');
              console.log('selected matkul', value);
            }}
            renderInput={(params) => <TextField {...params} label="Matkul" />}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            fullWidth
            label="Kode Matakuliah"
            disabled
            InputLabelProps={{ shrink: true }}
            value={values.kode}
            variant="outlined"
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            fullWidth
            label="Jumlah SKS"
            value={values.sks}
            disabled
            InputLabelProps={{ shrink: true }}
            variant="outlined"
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <Stack direction="row" spacing={2}>
            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              locale={idLocale}
            >
              <TimePicker
                label="Jam Mulai"
                value={values.start}
                onChange={(e) => handleChange(e, 'start')}
                renderInput={(params) => <TextField {...params} />}
              />
              <TimePicker
                label="Jam Selesai"
                value={values.end}
                onChange={(e) => handleChange(e, 'end')}
                renderInput={(params) => <TextField {...params} />}
              />
              <DesktopDatePicker
                label="Tanggal"
                inputFormat="dd/MM/yyyy"
                value={values.from}
                name="from"
                onChange={(e) => handleChange(e, 'from')}
                sx={{ width: 100 }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Stack>
        </Grid>
      </Grid>
    </CardContent>
  );
}
FormCardContent.propTypes = {
  prodi: PropTypes.array,
  handleChange: PropTypes.func,
  values: PropTypes.object
};
export default FormCardContent;
