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
import { setFilter } from '../../../store/action/masterAction';

const CustomerListToolbar = () => {
  const dispatch = useDispatch();
  const { filter } = useSelector((state) => state.master);
  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end'
        }}
      >
        <Link to="/app/master/prodi/add">
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
                value={filter.prodi}
                onChange={(e) => {
                  console.log(e.target.value);
                  dispatch(setFilter({ prodi: e.target.value.toLowerCase() }));
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon fontSize="small" color="action">
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  )
                }}
                placeholder="Search Program Studi"
                variant="outlined"
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default CustomerListToolbar;
