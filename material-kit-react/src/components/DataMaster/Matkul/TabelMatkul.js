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
import axios from 'axios';
import { Edit, Trash2 } from 'react-feather';
import {
  setEditMatkul,
  setAlertTrue
} from '../../../store/action/masterAction';
import Alert from '../../Alert';

function CustomerListResults() {
  const [matkul, ssetMatkul] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { filter } = useSelector((state) => state.master);

  const getMatkul = async () => {
    axios.get(`${process.env.REACT_APP_API}matakuliah`).then((res) => {
      ssetMatkul(res.data);
    });
  };

  const deleteData = (id) => {
    fetch(`${process.env.REACT_APP_API}matakuliah/${id}`, {
      method: 'DELETE'
    }).then((result) => {
      result.json().then((res) => {
        console.warn(res);
        getMatkul();
      });
    });
  };

  const handleClickOpen = (data) => {
    dispatch(setAlertTrue(data));
  };

  // eslint-disable-next-line no-unused-vars
  const handleEdit = (data) => {
    dispatch(setEditMatkul(data));
    navigate('/app/master/matkul/edit');
    console.log('edit matkul ok');
  };

  useEffect(() => {
    getMatkul();
  }, []);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const content = matkul
    .filter(
      (data) => data.nama?.toLowerCase().includes(filter.matkul)
        || data.kode?.toLowerCase().includes(filter.matkul)
        || data.sks?.toLowerCase().includes(filter.matkul)
    );
  /* eslint no-underscore-dangle: 0 */
  return (
    <Card>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>No.</TableCell>
                <TableCell>Kode Matakuliah</TableCell>
                <TableCell>Matakuliah</TableCell>
                <TableCell>SKS</TableCell>
                <TableCell>Aksi</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {content
                .slice(page * limit, limit * page + limit).map((data, i) => (
                  <TableRow hover key={data._id}>
                    <TableCell>{i + 1}</TableCell>
                    <TableCell>{data.kode}</TableCell>
                    <TableCell>{data.nama}</TableCell>
                    <TableCell>{data.sks}</TableCell>
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
        message="Anda yakin ingin menghapus data matakuliah ini?"
      />
    </Card>
  );
}

export default CustomerListResults;
