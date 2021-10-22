import { Box, Button, SvgIcon } from '@material-ui/core';
import { UserPlus } from 'react-feather';
import { Link } from 'react-router-dom';

const CustomerListToolbar = (props) => (
  <Box {...props}>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end'
      }}
    >
      <Link to="/app/formAbsensi">
        <Button color="primary" variant="contained">
          <SvgIcon fontSize="small" color="action">
            <UserPlus color="white" />
          </SvgIcon>
          &nbsp; Add customer
        </Button>
      </Link>
    </Box>
  </Box>
);

export default CustomerListToolbar;
