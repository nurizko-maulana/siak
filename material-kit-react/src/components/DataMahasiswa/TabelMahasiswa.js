/* eslint-disable no-underscore-dangle */
import { useState, useEffect } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useDispatch, useSelector } from 'react-redux';
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
  Button,
  Stack,
  Avatar
} from '@material-ui/core';
import axios from 'axios';
import { Edit, Trash2 } from 'react-feather';
import {
  setEditMahasiswa,
  setAlertTrue
} from '../../store/action/masterAction';
import Alert from '../Alert';

const TabelMahasiswa = () => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [mahasiswa, setMahasiswa] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { filter } = useSelector((state) => state.master);

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

  const filterData = (data) => {
    if (
      data.firstName.toLowerCase().includes(filter.mahasiswa)
      || data.lastName.toLowerCase().includes(filter.mahasiswa)
      || data.id_programStudi?.nama.toLowerCase().includes(filter.mahasiswa)
      || data.email.toLowerCase().includes(filter.mahasiswa)
      || data.jalan.toLowerCase().includes(filter.mahasiswa)
      || data.noTelp.toLowerCase().includes(filter.mahasiswa)
      || data.nik.toLowerCase().includes(filter.mahasiswa)
      || data.jenisKelamin.toLowerCase().includes(filter.mahasiswa)
    ) {
      return true;
    } if (filter.mahasiswa === '') {
      return true;
    }
    return false;
  };

  const content = mahasiswa.filter((data) => filterData(data));

  return (
    <Card>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Profil</TableCell>
                <TableCell>Nim</TableCell>
                <TableCell>Nama</TableCell>
                <TableCell>Prodi</TableCell>
                <TableCell>Kelas</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Alamat</TableCell>
                <TableCell>No Telp</TableCell>
                <TableCell>NIK</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell>Aksi</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {content.slice(page * limit, (limit * page) + limit).map((data) => (
                <TableRow hover key={data._id}>
                  <TableCell>
                    <Avatar
                      alt="Remy Sharp"
                      src={`http://localhost:8081/gambar/${data.foto}`}
                    />
                  </TableCell>
                  <TableCell>{data.nim}</TableCell>
                  <TableCell>{`${data.firstName} ${data.lastName}`}</TableCell>
                  <TableCell>{data.id_programStudi?.nama}</TableCell>
                  <TableCell>{data.id_kelas?.nama}</TableCell>
                  <TableCell>{data.email}</TableCell>
                  <TableCell>{data.jalan}</TableCell>
                  <TableCell>{data.noTelp}</TableCell>
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
        count={content.length}
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

export default TabelMahasiswa;
