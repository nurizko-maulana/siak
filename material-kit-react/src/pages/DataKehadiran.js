import { Helmet } from 'react-helmet-async';
import { Box, Container } from '@material-ui/core';
import CustomerListResults from '../components/DataKehadiran/CustomerListResults';
import CustomerListToolbar from '../components/DataKehadiran/CustomerListToolbar';
import customers from '../__mocks__/customers';

const DataKehadiran = () => (
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
          <CustomerListResults customers={customers} />
        </Box>
      </Container>
    </Box>
  </>
);

export default DataKehadiran;
