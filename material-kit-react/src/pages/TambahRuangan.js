import { Helmet } from 'react-helmet-async';
import { Box, Container } from '@material-ui/core';
import { useSelector } from 'react-redux';

import FormRuangan from '../components/DataMaster/Ruangan/FormRuangan';

const FormMahasiswa = () => {
  const { edit } = useSelector((state) => state.master);
  return (
    <>
      <Helmet>
        <title>{edit ? 'Edit Ruangan' : 'Tambah Ruangan'}</title>
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
            <FormRuangan />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default FormMahasiswa;
