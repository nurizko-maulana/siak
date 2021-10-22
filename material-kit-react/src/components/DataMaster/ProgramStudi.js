import {
  SvgIcon,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider
} from '@material-ui/core';
import { CheckSquare } from 'react-feather';
import { Link } from 'react-router-dom';

const ProgramStudi = (props) => (
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
          <CheckSquare />
        </SvgIcon>
      </Box>
    </CardContent>
    <Divider />
    <Link to="/app/prodi">
      <CardActions>
        <Button color="primary" fullWidth variant="text">
          Prodi
        </Button>
      </CardActions>
    </Link>
  </Card>
);

export default ProgramStudi;
