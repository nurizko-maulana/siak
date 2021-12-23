import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// eslint-disable-next-line object-curly-newline
import {
  AppBar,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  Tooltip,
  Menu,
  MenuItem,
  Typography
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { LogOut, User } from 'react-feather';
import Logo from './Logo';
import { logout } from '../store/action/usersAction';

const DashboardNavbar = ({ onMobileNavOpen, ...rest }) => {
  // eslint-disable-next-line no-unused-vars
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const dispatch = useDispatch();
  const { auth } = useSelector((e) => e.users);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
    dispatch(logout());
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <AppBar elevation={0} {...rest}>
      <Toolbar>
        <RouterLink to="/">
          <Logo />
        </RouterLink>
        <Box sx={{ flexGrow: 1 }} />
        <Typography variant="h4" sx={{ marginRight: '1em' }}>{auth.displayName ? `Hi, ${auth.displayName}` : auth.email}</Typography>
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton
              onClick={handleOpenUserMenu}
              sx={{ p: 0, color: 'white' }}
            >
              <User />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <MenuItem
              sx={{
                fontWeight: 'medium',
                justifyContent: 'flex-start',
                letterSpacing: 0,
                py: 1.25,
                textTransform: 'none',
                width: '100%',
                color: 'primary.main',
                '& svg': {
                  mr: 1
                }
              }}
              onClick={handleCloseNavMenu}
            >
              <LogOut size="20" />
              <span>Logout</span>
            </MenuItem>
          </Menu>
        </Box>
        <Hidden lgUp>
          <IconButton color="inherit" onClick={onMobileNavOpen} size="large">
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

DashboardNavbar.propTypes = {
  onMobileNavOpen: PropTypes.func
};

export default DashboardNavbar;
