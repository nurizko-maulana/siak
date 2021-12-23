import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Navigate, useNavigate } from 'react-router';
import { styled } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import DashboardNavbar from './DashboardNavbar';
import DashboardSidebar from './DashboardSidebar';
import { setToken } from '../store/action/usersAction';

const DashboardLayoutRoot = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  display: 'flex',
  height: '100%',
  overflow: 'hidden',
  width: '100%'
}));

const DashboardLayoutWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  overflow: 'hidden',
  paddingTop: 64,
  [theme.breakpoints.up('lg')]: {
    paddingLeft: 256
  }
}));

const DashboardLayoutContainer = styled('div')({
  display: 'flex',
  flex: '1 1 auto',
  overflow: 'hidden'
});

const DashboardLayoutContent = styled('div')({
  flex: '1 1 auto',
  height: '100%',
  overflow: 'auto'
});

const DashboardLayout = () => {
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const navigate = useNavigate();
  const { auth } = useSelector((s) => s.users);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('login auth', localStorage.getItem('auth'));
    console.log('login displayName', localStorage.getItem('displayName'));
    if (!localStorage.getItem('auth')) {
      navigate('/login');
    }
    console.log('set auth token', auth.idToken);
    if (!auth.idToken && localStorage.getItem('auth')) {
      console.log('set auth token');
      dispatch(
        setToken({
          idToken: JSON.parse(localStorage.getItem('auth')),
          displayName: JSON.parse(localStorage.getItem('displayName'))
        })
      );
    }
  }, [auth]);

  return (
    <DashboardLayoutRoot>
      <DashboardNavbar onMobileNavOpen={() => setMobileNavOpen(true)} />
      <DashboardSidebar
        onMobileClose={() => setMobileNavOpen(false)}
        openMobile={isMobileNavOpen}
      />
      <DashboardLayoutWrapper>
        <DashboardLayoutContainer>
          <DashboardLayoutContent>
            {auth ? <Outlet /> : <Navigate to="/login" />}
          </DashboardLayoutContent>
        </DashboardLayoutContainer>
      </DashboardLayoutWrapper>
    </DashboardLayoutRoot>
  );
};

export default DashboardLayout;
