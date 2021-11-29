/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
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
  Stack
} from '@material-ui/core';
import { Edit, Trash2 } from 'react-feather';
import {
  setEditRuangan,
  setAlertTrue
} from '../../../store/action/masterAction';
import Alert from '../../Alert';

function CustomerListResults() {
  const [ruangan, setRuangan] = useState([]);
  const dispatch = useDispatch();
  const { filter } = useSelector((state) => state.master);
  const navigate = useNavigate();

  const getRuangan = async () => {
    const response = await fetch(`${process.env.REACT_APP_API}ruangan`);
    const matkuliah = await response.json();
    setRuangan(matkuliah);
  };

  const deleteData = (id) => {
    fetch(`${process.env.REACT_APP_API}ruangan/${id}`, {
      method: 'DELETE'
    }).then((result) => {
      result.json().then((res) => {
        console.warn(res);
        getRuangan();
      });
    });
  };
  const handleClickOpen = (data) => {
    dispatch(setAlertTrue(data));
  };

  const handleEdit = (data) => {
    dispatch(setEditRuangan(data));
    navigate('/app/master/ruangan/edit');
    console.log('edit ruangan ok');
  };

  useEffect(() => {
    getRuangan();
  }, []);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  const content = ruangan.filter((data) => data.nama.toLowerCase().includes(filter.ruangan)).slice(0, limit);
  /* eslint no-underscore-dangle: 0 */
  return (
    <Card>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>No.</TableCell>
                <TableCell>Ruangan</TableCell>
                <TableCell>Aksi</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {content.map((r, i) => (
                <TableRow hover key={r._id}>
                  <TableCell>{(page * limit) + (i + 1)}</TableCell>
                  <TableCell>{r.nama}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={2}>
                      <Button
                        variant="outlined"
                        startIcon={<Trash2 />}
                        onClick={() => handleClickOpen(r)}
                      >
                        Delete
                      </Button>
                      <Button
                        onClick={() => handleEdit(r)}
                        variant="contained"
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
        message="Anda yakin ingin mengapus ruangan ini?"
      />
    </Card>
  );
}

export default CustomerListResults;
