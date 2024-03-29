import { Helmet } from 'react-helmet-async';
import { Box, Container } from '@material-ui/core';
import TambahMahasiswa from '../components/DataMahasiswa/TambahMahasiswa';

const FormMahasiswa = () => (
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
        <Box sx={{ pt: 3 }}>
          <TambahMahasiswa />
        </Box>
      </Container>
    </Box>
  </>
);

export default FormMahasiswa;
