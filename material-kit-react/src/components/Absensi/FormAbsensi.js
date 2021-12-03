/* eslint-disable operator-linebreak */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import { useState, useEffect } from 'react';
import axios from 'axios';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
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
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDeepCompareEffectNoCheck } from 'use-deep-compare-effect';
import { updateData } from '../../store/action/masterAction';

import FormCardContent from './FormCardContent';

const AccountProfileDetails = (props) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [isUpload, setIsUpload] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { absensi, edit } = useSelector((state) => state.master);

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  const [prodi, setProdi] = useState([]);

  const initialValues = {
    kelas: null,
    matkul: null,
    mahasiswa: null,
    prodi: null,
    tanggal: new Date().getTime(),
    start: null,
    end: null,
    sks: null
  };

  const validationSchema = Yup.object({
    kelas: Yup.mixed().required('Required!'),
    matkul: Yup.mixed().required('Required!'),
    mahasiswa: Yup.mixed().required('Required!'),
    prodi: Yup.mixed().required('Required!'),
    tanggal: Yup.mixed().required('Required!'),
    start: Yup.mixed().required('Required!'),
    end: Yup.mixed().required('Required!'),
    sks: Yup.mixed().required('Required!')
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
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
          // navigate('/app/absensi');
          setIsUpload(false);
        });
    }
  });
  const getMahasiswa = () => {
    console.log('values', formik.values);
    axios
      .get(`${process.env.REACT_APP_API}absensi/laporan`, {
        params: {
          matakuliah: formik.values.matkul?._id,
          kelas: formik.values.kelas?._id
        }
      })
      .then((res) => {
        console.log('mahasiswa', res);
      });
  };

  const handleChange = (event, name) => {
    formik.setFieldValue(name, event);
  };

  const handleChangeKehadiran = (e, index) => {
    formik.setFieldValue(() => {
      const p = { ...formik.values };
      p.mahasiswa[index].keterangan =
        e.target.value === 'hadir' ? 'hadir' : 'absen';
      console.log(p);
      return {
        ...p
      };
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
      handleChange(absensi.masuk, 'start');
      handleChange(absensi.keluar, 'end');
      handleChange(absensi.id_kelas[0]?.id_programStudi, 'prodi');
      handleChange(absensi.id_kelas[0], 'kelas');
      handleChange(absensi.id_matakuliah[0], 'matkul');
      handleChange(absensi.id_matakuliah[0].kode, 'kode');
      handleChange(absensi.id_matakuliah[0].sks, 'sks');
      handleChange(absensi.tanggal, 'tanggal');
      handleChange(absensi.absensi, 'mahasiswa');
      formik.setFieldValue('start', absensi.masuk);
      formik.setFieldValue('end', absensi.keluar);
      formik.setFieldValue('prodi', absensi.id_kelas[0]?.id_programStudi);
      formik.setFieldValue('kelas', absensi.id_kelas[0]);
      formik.setFieldValue('matkul', absensi.id_matakuliah[0]);
      formik.setFieldValue('kode', absensi.id_matakuliah[0].kode);
      formik.setFieldValue('sks', absensi.id_matakuliah[0].sks);
      formik.setFieldValue('tanggal', absensi.tanggal);
      formik.setFieldValue('mahasiswa', absensi.absensi);
    } else {
      getProdi();
    }
  }, []);

  useDeepCompareEffectNoCheck(() => {
    if (formik.values.matkul) {
      handleChange(formik.values.matkul && formik.values.matkul.kode, 'kode');
      handleChange(formik.values.matkul && formik.values.matkul.sks, 'sks');
    }
  }, [formik.values.matkul]);
  console.log(formik.values);
  return (
    <form autoComplete="off" {...props} onSubmit={formik.handleSubmit}>
      <Card>
        <CardHeader
          subheader="Lengkapi Data Berikut"
          title={edit ? 'Edit Absensi' : 'Tambah Absensi'}
        />
        <Divider />

        <FormCardContent
          prodi={prodi}
          handleChange={handleChange}
          values={formik.values}
          errors={formik.errors}
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
                  {formik.values?.mahasiswa?.slice(0, limit).map((data, index) => {
                    let nama = '';
                    const space = ' ';

                    if (edit) {
                      nama =
                        formik.values.mahasiswa[index].firstName +
                        space +
                        formik.values.mahasiswa[index].lastName;
                    } else {
                      nama =
                        formik.values.mahasiswa[index].firstName +
                        space +
                        formik.values.mahasiswa[index].lastName;
                    }
                    return (
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
                        <TableCell>{nama}</TableCell>
                        <TableCell>
                          <FormControl disabled={edit} component="fieldset">
                            <RadioGroup
                              row
                              aria-label="gender"
                              onChange={(e) => handleChangeKehadiran(e, index)}
                              name="keterangan"
                              value={formik.values.mahasiswa[index].keterangan}
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
                    );
                  })}
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
              onClick={() => {
                navigate('/app/absensi');
                dispatch(updateData());
              }}
              on
              variant="contained"
            >
              Back
            </Button>
          ) : (
            <Button disabled={!formik.isValid || formik.isSubmitting} color="primary" type="submit" variant="contained">
              Save details
            </Button>
          )}
        </Box>
      </Card>
    </form>
  );
};

export default AccountProfileDetails;
