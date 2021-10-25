import { Helmet } from 'react-helmet-async';
import { Box, Container } from '@material-ui/core';
import EditForm from '../components/DataMaster/Ruangan/EditForm';

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
          <EditForm />
        </Box>
      </Container>
    </Box>
  </>
);

export default FormMahasiswa;
