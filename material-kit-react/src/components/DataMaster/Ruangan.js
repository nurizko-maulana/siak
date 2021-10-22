import {
  SvgIcon,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider
} from '@material-ui/core';
import { Map } from 'react-feather';
import { Link } from 'react-router-dom';

const Ruangan = (props) => (
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
          <Map />
        </SvgIcon>
      </Box>
    </CardContent>
    <Divider />
    <Link to="/app/ruangan">
      <CardActions>
        <Button color="primary" fullWidth variant="text">
          Ruangan
        </Button>
      </CardActions>
    </Link>
  </Card>
);

export default Ruangan;
