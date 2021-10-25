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

function CustomerListResults() {
  const [prodi, setProdi] = useState([]);

  const getProdi = async () => {
    const response = await fetch(
      'https://limitless-ocean-86312.herokuapp.com/api/prodi'
    );
    const matkuliah = await response.json();
    setProdi(matkuliah);
  };

  function deleteData(id) {
    fetch(`https://limitless-ocean-86312.herokuapp.com/api/prodi/${id}`, {
      method: 'DELETE'
    }).then((result) => {
      result.json().then((res) => {
        console.warn(res);
        getProdi();
      });
    });
  }

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

                <TableCell>Aksi</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {prodi.slice(0, limit).map((p, i) => (
                <TableRow hover key={p.id}>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell>{p.nama_prodi}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={2}>
                      <Button
                        variant="outlined"
                        startIcon={<Trash2 />}
                        onClick={() => deleteData(p._id)}
                      >
                        Delete
                      </Button>
                      <Button variant="contained" endIcon={<Edit />}>
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
