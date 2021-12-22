/* eslint-disable no-unused-vars */
import 'react-perfect-scrollbar/dist/css/styles.css';
import { useState } from 'react';
import { useNavigate, useRoutes, Navigate } from 'react-router-dom';
import { ThemeProvider, StyledEngineProvider } from '@material-ui/core';
import { HelmetProvider } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import GlobalStyles from './components/GlobalStyles';
import theme from './theme';
import routes from './routes';
import Login from './pages/Login';

const App = () => {
  const content = useRoutes(routes);
  const { auth } = useSelector((s) => s.users);

  return (
    <HelmetProvider>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          {/* {auth.idToken ? content : <Navigate to="/login" />} */}
          {content}
        </ThemeProvider>
      </StyledEngineProvider>
    </HelmetProvider>
  );
};

export default App;
