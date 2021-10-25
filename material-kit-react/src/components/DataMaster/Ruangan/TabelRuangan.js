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
  const [ruangan, setRuangan] = useState([]);

  const getRuangan = async () => {
    const response = await fetch(
      'https://limitless-ocean-86312.herokuapp.com/api/ruangan'
    );
    const matkuliah = await response.json();
    setRuangan(matkuliah);
  };

  function deleteData(id) {
    fetch(`https://limitless-ocean-86312.herokuapp.com/api/ruangan/${id}`, {
      method: 'DELETE'
    }).then((result) => {
      result.json().then((res) => {
        console.warn(res);
        getRuangan();
      });
    });
  }

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
              {ruangan.slice(0, limit).map((customer, i) => (
                <TableRow hover key={customer._id}>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell>{customer.ruang}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={2}>
                      <Button
                        variant="outlined"
                        startIcon={<Trash2 />}
                        onClick={() => deleteData(customer._id)}
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
        count={ruangan.length}
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
