/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
import { useState, useEffect } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
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
  Stack
} from '@material-ui/core';
import { Edit, Trash2 } from 'react-feather';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setEditKelas, setAlertTrue } from '../../../store/action/masterAction';

import Alert from '../../Alert';

function CustomerListResults() {
  const [kelas, setKelas] = useState([]);
  const dispatch = useDispatch();
  const { filter } = useSelector((state) => state.master);
  const navigate = useNavigate();

  const getKelas = async () => {
    const response = await fetch(`${process.env.REACT_APP_API}kelas`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    });
    const kelass = await response.json();
    setKelas(kelass);
  };

  const handleEdit = (data) => {
    dispatch(setEditKelas(data));
    navigate('/app/master/kelas/edit');
  };
  const handleClickOpen = (data) => {
    dispatch(setAlertTrue(data));
  };

  const deleteData = (id) => {
    fetch(`${process.env.REACT_APP_API}kelas/${id}`, {
      method: 'DELETE'
    }).then((result) => {
      result.json().then((res) => {
        console.warn(res);
        getKelas();
      });
    });
  };

  useEffect(() => {
    getKelas();
  }, []);

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const content = kelas.filter((data) => data.nama.toLowerCase().includes(filter.kelas) || data.id_programStudi?.nama.toLowerCase().includes(filter.kelas));
  /* eslint no-underscore-dangle: 0 */
  return (
    <Card>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>No.</TableCell>
                <TableCell>Kelas</TableCell>
                <TableCell>Program Studi</TableCell>
                <TableCell>Matakuliah</TableCell>
                <TableCell>Aksi</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {content.slice(page * limit, (limit * page) + limit).map((k, i) => (
                <TableRow hover key={k._id}>
                  <TableCell>{(page * limit) + (i + 1)}</TableCell>
                  <TableCell>{k.nama}</TableCell>
                  <TableCell>{k.id_programStudi?.nama}</TableCell>
                  <TableCell>
                    {k.id_matakuliah.map((matkul) => {
                      if (k.id_matakuliah.length > 1) {
                        return `${matkul.nama} | `;
                      }
                      return matkul.nama;
                    })}
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={2}>
                      <Button
                        variant="outlined"
                        startIcon={<Trash2 />}
                        onClick={() => handleClickOpen(k)}
                      >
                        Delete
                      </Button>
                      <Button
                        variant="contained"
                        onClick={() => handleEdit(k)}
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
        message="Anda yakin ingin menghapus data kelas ini?"
      />
    </Card>
  );
}

export default CustomerListResults;
