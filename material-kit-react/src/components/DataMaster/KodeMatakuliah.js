import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  SvgIcon
} from '@material-ui/core';
import { Code } from 'react-feather';
import { Link } from 'react-router-dom';

const KodeMatakuliah = (props) => (
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
          <Code />
        </SvgIcon>
      </Box>
    </CardContent>
    <Divider />
    <Link to="/app/matkul">
      <CardActions>
        <Button color="primary" fullWidth variant="text">
          Kode Matakuliah
        </Button>
      </CardActions>
    </Link>
  </Card>
);

export default KodeMatakuliah;
