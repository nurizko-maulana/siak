import { Helmet } from 'react-helmet-async';
import { Box, Container } from '@material-ui/core';
import FormKelas from '../components/DataMaster/Kelas/FormKelas';

const FormMahasiswa = () => (
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
        <Box sx={{ pt: 3 }}>
          <FormKelas />
        </Box>
      </Container>
    </Box>
  </>
);

export default FormMahasiswa;
