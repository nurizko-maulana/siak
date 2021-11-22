import { Helmet } from 'react-helmet-async';
import { Box, Container } from '@material-ui/core';
import TabelMahasiswa from '../components/DataMahasiswa/TabelMahasiswa';
import CustomerListToolbar from '../components/DataMahasiswa/CustomerListToolbar';
import customers from '../__mocks__/customers';

const DataMahasiswa = () => (
  <>
    <Helmet>
      <title>SIAK | Mahasiswa</title>
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
          <TabelMahasiswa customers={customers} />
        </Box>
      </Container>
    </Box>
  </>
);

export default DataMahasiswa;
