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

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setEditKelas } from '../../../store/action/masterAction';

function CustomerListResults() {
  const [kelas, setKelas] = useState([]);
  const dispatch = useDispatch();
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
    console.log('kelas', kelas);
  };

  const handleEdit = (data) => {
    dispatch(setEditKelas(data));
    navigate('/app/master/kelas/edit');
  };

  function deleteData(id) {
    fetch(`${process.env.REACT_APP_API}kelas/${id}`, {
      method: 'DELETE'
    }).then((result) => {
      result.json().then((res) => {
        console.warn(res);
        getKelas();
      });
    });
  }

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
                <TableCell>Matakuliah</TableCell>
                <TableCell>Aksi</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {kelas.slice(0, limit).map((k, i) => (
                <TableRow hover key={k._id}>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell>{k.nama}</TableCell>
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
                        onClick={() => deleteData(k._id)}
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
        count={kelas.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
}

export default CustomerListResults;
