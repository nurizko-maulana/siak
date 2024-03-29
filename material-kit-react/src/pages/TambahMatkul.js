import { Helmet } from 'react-helmet-async';
import { Box, Container } from '@material-ui/core';
import FormMatkul from '../components/DataMaster/Matkul/FormMatkul';

const FormMahasiswa = () => (
  <>
    <Helmet>
      <title>SIAK | MATAKULIAH </title>
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
          <FormMatkul />
        </Box>
      </Container>
    </Box>
  </>
);

export default FormMahasiswa;
