import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import CustomerListToolbar from '../components/DataMaster/Prodi/CustomerListToolbar';
import TabelProdi from '../components/DataMaster/Prodi/TabelProdi';
import customers from '../__mocks__/customers';

const DataMahasiswa = () => (
  <>
    <Helmet>
      <title>Customers | Material Kit</title>
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
          <TabelProdi customers={customers} />
        </Box>
      </Container>
    </Box>
  </>
);

export default DataMahasiswa;
