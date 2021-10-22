import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  SvgIcon
} from '@material-ui/core';
import { Server } from 'react-feather';
import { Link } from 'react-router-dom';

const DataKelas = (props) => (
  <Card {...props}>
    <CardContent>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <SvgIcon fontSize="large">
          <Server />
        </SvgIcon>
      </Box>
    </CardContent>
    <Divider />
    <Link to="/app/kelas">
      <CardActions>
        <Button color="primary" fullWidth variant="text">
          Data Kelas
        </Button>
      </CardActions>
    </Link>
  </Card>
);

export default DataKelas;
