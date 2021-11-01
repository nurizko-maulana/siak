/* eslint-disable prefer-template */
import { useState, useEffect } from 'react';
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
  Button,
  Stack
} from '@material-ui/core';
import { Edit, Trash2 } from 'react-feather';
import { setEditProdi } from '../../../store/action/masterAction';

function CustomerListResults() {
  const [prodi, setProdi] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getProdi = async () => {
    const response = await fetch(`${process.env.REACT_APP_API}programStudi`);
    const matkuliah = await response.json();
    setProdi(matkuliah);
  };

  function deleteData(id) {
    fetch(`${process.env.REACT_APP_API}programStudi/${id}`, {
      method: 'DELETE'
    }).then((result) => {
      result.json().then((res) => {
        console.warn(res);
        getProdi();
      });
    });
  }

  const handleEdit = (data) => {
    dispatch(setEditProdi(data));
    console.log(data);
    navigate('/app/master/prodi/edit');
  };

  useEffect(() => {
    getProdi();
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
                <TableCell>Prodi</TableCell>
                <TableCell>Kelas</TableCell>

                <TableCell>Aksi</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {prodi.slice(0, limit).map((p, i) => (
                <TableRow hover key={p._id}>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell>{p.nama}</TableCell>
                  <TableCell>
                    {p.id_kelas.map((kelas) => {
                      if (p.id_kelas.length > 1) {
                        return kelas.nama + ' , ';
                      }
                      return kelas.nama;
                    })}
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={2}>
                      <Button
                        variant="outlined"
                        startIcon={<Trash2 />}
                        onClick={() => deleteData(p._id)}
                      >
                        Delete
                      </Button>
                      <Button
                        variant="contained"
                        onClick={() => handleEdit(p)}
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
        count={prodi.length}
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
