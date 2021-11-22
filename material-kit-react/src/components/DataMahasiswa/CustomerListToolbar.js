import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon
} from '@material-ui/core';
import { Search as SearchIcon, UserPlus } from 'react-feather';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../../store/action/masterAction';

const CustomerListToolbar = (props) => {
  const dispatch = useDispatch();
  const { filter } = useSelector((state) => state.master);
  return (
    <Box {...props}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end'
        }}
      >
        <Link to="/app/mahasiswa/add">
          <Button color="primary" variant="contained">
            <SvgIcon fontSize="small" color="action">
              <UserPlus color="white" />
            </SvgIcon>
            &nbsp; Tambah Data
          </Button>
        </Link>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Box sx={{ maxWidth: 500 }}>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon fontSize="small" color="action">
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  )
                }}
                placeholder="Search Matakuliah"
                variant="outlined"
                value={filter.mahasiswa}
                onChange={(e) => {
                  console.log(e.target.value);
                  dispatch(setFilter({ mahasiswa: e.target.value }));
                }}
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default CustomerListToolbar;
