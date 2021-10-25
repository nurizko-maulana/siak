import { Helmet } from 'react-helmet-async';
import { Box, Container, Grid } from '@material-ui/core';
import DataKelas from '../components/DataMaster/DataKelas';
import KodeMatakuliah from '../components/DataMaster/KodeMatakuliah';
import Ruangan from '../components/DataMaster/Ruangan';
import ProgramStudi from '../components/DataMaster/ProgramStudi';

const Master = () => (
  <>
    <Helmet>
      <title>Master | Material Kit</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item lg={4} md={6} xs={12}>
            <KodeMatakuliah />
          </Grid>
          <Grid item lg={4} md={6} xs={12}>
            <DataKelas />
          </Grid>
          <Grid item lg={4} md={6} xs={12}>
            <Ruangan />
          </Grid>
          <Grid item lg={4} md={6} xs={12}>
            <ProgramStudi />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

export default Master;
