/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
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
  Typography,
  Button
} from '@material-ui/core';
import axios from 'axios';
import { Edit } from 'react-feather';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setEditAbsensi } from '../../store/action/masterAction';

const CustomerListResults = ({ customers }) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [absensi, setAbsensi] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const getAbsensi = () => {
    axios.get(`${process.env.REACT_APP_API}absensi`).then((res) => {
      console.log(res);
      setAbsensi(res.data);
    });
  };

  const handleEdit = (data) => {
    dispatch(setEditAbsensi(data));
    navigate('/app/absensi/edit');
  };

  useEffect(() => {
    getAbsensi();
  }, []);

  return (
    <Card>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>No</TableCell>
                <TableCell>Kelas</TableCell>
                <TableCell>Kode Matkul</TableCell>
                <TableCell>Tanggal</TableCell>
                <TableCell>Ket</TableCell>
                <TableCell>Detail</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {absensi?.slice(0, limit).map((data, index) => (
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
                  <TableCell>{data.id_kelas.nama}</TableCell>
                  <TableCell>{data?.id_matakuliah?.nama}</TableCell>
                  <TableCell>
                    {moment(new Date(+data.tanggal)).format('DD/MM/YYYY')}
                  </TableCell>
                  <TableCell>
                    {/* {moment(data.createdAt).format('DD/MM/YYYY')} */}
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => handleEdit(data)}>
                      <Edit />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={absensi?.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

CustomerListResults.propTypes = {
  customers: PropTypes.array.isRequired
};

export default CustomerListResults;
