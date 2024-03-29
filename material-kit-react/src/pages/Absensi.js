import { Helmet } from 'react-helmet-async';
import { Box, Container } from '@material-ui/core';
import TabelAbsensi from '../components/Absensi/TabelAbsensi';
import CustomerListToolbar from '../components/Absensi/CustomerListToolbar';

const Absensi = () => (
  <>
    <Helmet>
      <title>SIAK | Absensi</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <CustomerListToolbar />
        <Box sx={{ pt: 3 }}>
          <TabelAbsensi />
        </Box>
      </Container>
    </Box>
  </>
);

export default Absensi;
