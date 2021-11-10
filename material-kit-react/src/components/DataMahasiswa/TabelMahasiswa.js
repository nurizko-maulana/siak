/* eslint-disable no-underscore-dangle */
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Button,
  Stack
} from '@material-ui/core';
import axios from 'axios';
import { Edit, Trash2 } from 'react-feather';
import {
  setEditMahasiswa,
  setAlertTrue
} from '../../store/action/masterAction';
import Alert from '../Alert';

const TabelMahasiswa = ({ customers }) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [mahasiswa, setMahasiswa] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleClickOpen = (data) => {
    dispatch(setAlertTrue(data));
  };

  const getMahasiswa = () => {
    axios.get(`${process.env.REACT_APP_API}mahasiswa`).then((res) => {
      setMahasiswa(res.data);
      console.log(res);
    });
  };

  const deleteData = (id) => {
    console.log('ok delete');
    axios.delete(`${process.env.REACT_APP_API}mahasiswa/${id}`).then((res) => {
      console.log(res);
      getMahasiswa();
    });
  };
  const handleEdit = (data) => {
    dispatch(setEditMahasiswa(data));
    navigate('/app/mahasiswa/edit');
  };
  useEffect(() => {
    getMahasiswa();
  }, []);

  return (
    <Card>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>No</TableCell>
                <TableCell>Nim</TableCell>
                <TableCell>Nama</TableCell>
                <TableCell>Prodi</TableCell>
                <TableCell>Kelas</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Alamat</TableCell>
                <TableCell>No Telp</TableCell>
                <TableCell>Alamat Ortu</TableCell>
                <TableCell>NIK</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell>Aksi</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mahasiswa.slice(0, limit).map((data, index) => (
                <TableRow hover key={data._id}>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      {index + 1}
                      <Typography color="textPrimary" variant="body1">
                        {data.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{data.nim}</TableCell>
                  <TableCell>{data.nama}</TableCell>
                  <TableCell>{data.id_programStudi?.nama}</TableCell>
                  <TableCell>{data.id_kelas?.nama}</TableCell>
                  <TableCell>{data.email}</TableCell>
                  <TableCell>{data.alamat}</TableCell>
                  <TableCell>{data.noTelp}</TableCell>
                  <TableCell>{data.alamatOrtu}</TableCell>
                  <TableCell>{data.nik}</TableCell>
                  <TableCell>{data.jenisKelamin}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={2}>
                      <Button
                        variant="outlined"
                        startIcon={<Trash2 />}
                        onClick={() => handleClickOpen(data)}
                      >
                        Delete
                      </Button>
                      <Button
                        variant="contained"
                        onClick={() => handleEdit(data)}
                        endIcon={<Edit />}
                      >
                        Edit
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={customers.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
      <Alert
        onConfirm={deleteData}
        message="Anda yakin ingin menghapus data mahasiswa ini?"
      />
    </Card>
  );
};

TabelMahasiswa.propTypes = {
  customers: PropTypes.array.isRequired
};

export default TabelMahasiswa;
