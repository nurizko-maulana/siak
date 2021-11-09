/* eslint-disable operator-linebreak */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Table,
  TableBody,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl
} from '@material-ui/core';
import { useDeepCompareEffectNoCheck } from 'use-deep-compare-effect';

import FormCardContent from './FormCardContent';

const AccountProfileDetails = (props) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const navigate = useNavigate();

  const { absensi, edit } = useSelector((state) => state.master);

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  const [prodi, setProdi] = useState([]);
  const [values, setValues] = useState({
    kelas: null,
    matkul: null,
    mahasiswa: null,
    prodi: null,
    tanggal: new Date().getTime(),
    start: null,
    end: null,
    sks: null
  });

  const getMahasiswa = () => {
    console.log('values', values);
    axios
      .get(`${process.env.REACT_APP_API}absensi/laporan`, {
        params: {
          matakuliah: values.matkul._id,
          kelas: values.kelas._id
        }
      })
      .then((res) => {
        console.log('mahasiswa', res);
      });
  };

  const handleChange = (event, name) => {
    setValues((v) => ({
      ...v,
      [name]: event
    }));
  };

  const handleChangeKehadiran = (e, index) => {
    setValues((v) => {
      const p = { ...v };
      p.mahasiswa[index].keterangan =
        e.target.value === 'hadir' ? 'hadir' : 'absen';
      console.log(p);
      return {
        ...p
      };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_API}absensi`, {
        id_matakuliah: values.matkul._id,
        id_kelas: values.kelas._id,
        jam: {
          masuk: values.start,
          keluar: values.end
        },
        tanggal: values.tanggal,
        absensi: values.mahasiswa.map((data) => ({
          id_mahasiswa: data._id,
          keterangan: data.keterangan
        }))
      })
      .then((res) => {
        console.log(res);
        navigate('/app/absensi');
      });
  };

  const getProdi = () => {
    axios.get(`${process.env.REACT_APP_API}programstudi`).then((res) => {
      console.log('prodi', res);
      setProdi(res.data);
    });
  };

  useEffect(() => {
    getProdi();
    if (edit) {
      handleChange(absensi.jam.masuk, 'start');
      handleChange(absensi.jam.keluar, 'end');
      handleChange(absensi.id_kelas.id_programStudi, 'prodi');
      handleChange(absensi.id_kelas, 'kelas');
      handleChange(absensi.id_matakuliah, 'matkul');
      handleChange(absensi.id_matakuliah.kode, 'kode');
      handleChange(absensi.id_matakuliah.sks, 'sks');
      handleChange(absensi.tanggal, 'tanggal');
      handleChange(absensi.absensi, 'mahasiswa');
    } else {
      getProdi();
    }
  }, []);

  useDeepCompareEffectNoCheck(() => {
    if (values.matkul) {
      getMahasiswa();
      handleChange(values.matkul && values.matkul.kode, 'kode');
      handleChange(values.matkul && values.matkul.sks, 'sks');
    }
  }, [values.matkul]);

  return (
    <form autoComplete="off" {...props} onSubmit={(e) => handleSubmit(e)}>
      <Card>
        <CardHeader
          subheader="Lengkapi Data Berikut"
          title={edit ? 'Edit Absensi' : 'Tambah Absensi'}
        />
        <Divider />

        <FormCardContent
          prodi={prodi}
          handleChange={handleChange}
          values={values}
        />

        <Card>
          <PerfectScrollbar>
            <Box sx={{ minWidth: 1050 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>No</TableCell>
                    <TableCell>Nama Mahasiswa</TableCell>

                    <TableCell>Keterangan</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {values?.mahasiswa?.slice(0, limit).map((data, index) => (
                    <TableRow hover key={data._id}>
                      <TableCell>
                        <Box
                          sx={{
                            alignItems: 'center',
                            display: 'flex'
                          }}
                        >
                          <Typography color="textPrimary" variant="body1">
                            {index + 1}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>{data.nama}</TableCell>

                      <TableCell>
                        <FormControl disabled={edit} component="fieldset">
                          <RadioGroup
                            row
                            aria-label="gender"
                            onChange={(e) => handleChangeKehadiran(e, index)}
                            name="keterangan"
                            value={values.mahasiswa[index].keterangan}
                          >
                            <FormControlLabel
                              /* eslint-disable-next-line */
                              value="hadir"
                              control={<Radio />}
                              label="Hadir"
                            />
                            <FormControlLabel
                              value="absen"
                              control={<Radio />}
                              label="Absen"
                            />
                          </RadioGroup>
                        </FormControl>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </PerfectScrollbar>
          <TablePagination
            component="div"
            count={[].length}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleLimitChange}
            page={page}
            rowsPerPage={limit}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </Card>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
          {edit ? (
            <Button
              color="primary"
              onClick={() => navigate('/app/absensi')}
              on
              variant="contained"
            >
              Back
            </Button>
          ) : (
            <Button color="primary" type="submit" variant="contained">
              Save details
            </Button>
          )}
        </Box>
      </Card>
    </form>
  );
};

export default AccountProfileDetails;
