import { Navigate } from 'react-router-dom';
import DashboardLayout from './components/DashboardLayout';
import MainLayout from './components/MainLayout';
import Master from './pages/Master';
import Absensi from './pages/Absensi';
import Print from './pages/Print';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import DataMahasiswa from './pages/DataMahasiswa';
import DataKehadiran from './pages/DataKehadiran';
import TambahMahasiswa from './pages/TambahMahasiswa';
import TambahKelas from './pages/TambahKelas';
import TambahMatkul from './pages/TambahMatkul';
import TambahProdi from './pages/TambahProdi';
import TambahRuangan from './pages/TambahRuangan';
import MasterKelas from './pages/MasterKelas';
import MasterMatkul from './pages/MasterMatkul';
import MasterProdi from './pages/MasterProdi';
import MasterRuangan from './pages/MasterRuangan';
import TambahAbsensi from './pages/TambahAbsensi';
import NotFound from './pages/NotFound';

const routes = [
  {
    path: '/app',
    exact: true,
    element: <DashboardLayout />,
    children: [
      {
        path: '/app/master',
        element: <Master />
      },
      { path: 'matakuliah', element: <MasterMatkul /> },
      {
        path: '/app/master/ruangan',

        element: <MasterRuangan />
      },
      {
        path: '/app/master/ruangan/add',
        element: <TambahRuangan />
      },
      {
        path: '/app/master/ruangan/edit',
        element: <TambahRuangan />
      },
      {
        path: '/app/master/kelas',

        element: <MasterKelas />
      },
      {
        path: '/app/master/kelas/add',
        element: <TambahKelas />
      },
      {
        path: '/app/master/kelas/edit',
        element: <TambahKelas />
      },
      {
        path: '/app/master/prodi',

        element: <MasterProdi />
      },
      {
        path: '/app/master/prodi/add',
        element: <TambahProdi />
      },
      {
        path: '/app/master/prodi/edit',
        element: <TambahProdi />
      },
      {
        path: '/app/master/matkul',

        element: <MasterMatkul />
      },
      {
        path: '/app/master/matkul/add',
        element: <TambahMatkul />
      },
      {
        path: '/app/master/matkul/edit',
        element: <TambahMatkul />
      },
      { path: 'absensi', element: <Absensi /> },
      { path: 'absensi/add', element: <TambahAbsensi /> },
      { path: 'absensi/edit', element: <TambahAbsensi /> },
      { path: 'mahasiswa', element: <DataMahasiswa /> },
      { path: 'dataKehadiran', element: <DataKehadiran /> },
      { path: 'mahasiswa/add', element: <TambahMahasiswa /> },
      { path: 'mahasiswa/edit', element: <TambahMahasiswa /> },
      { path: '*', element: <NotFound /> }
    ]
  },
  {
    path: '/',
    exact: true,
    element: <MainLayout />,
    children: [
      { path: '/', element: <Navigate to="/app/master" /> },
      { path: '*', element: <NotFound /> }
    ]
  },
  {
    path: '/login',
    exact: true,
    element: <Login />
  },
  {
    path: '/signup',
    exact: true,
    element: <SignUp />
  },
  {
    path: '/print',
    element: <Print />
  }
];

export default routes;
