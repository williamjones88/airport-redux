import React, { useState } from 'react';
import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import GoogleMap from './components/googleMap/googleMap';
import Search from './components/search/search';
import About from './components/about';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import Grid from '@mui/material/Grid';

function App() {

  const pages = [{ page: 'HOME', route: '/' }, { page: 'ABOUT', route: '/about' }];
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  

  return (
    <Grid container flexDirection='column' flexWrap='nowrap' style={{ position: 'absolute', height: '100%' }}>
      <Grid style={{ backgroundColor: 'rgb(77, 182, 172)' }}>
        <Toolbar>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Airport App
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.page}>
                  <Typography textAlign="center" onClick={handleCloseNavMenu}><Link to={page.route} className='custom-link'>{page.page}</Link></Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Airport App
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.page}
                sx={{ color: 'white', display: 'block' }}
              >
                <Link to={page.route} className='custom-link'>
                  {page.page}
                </Link>
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Grid>
      <Grid>
        <Routes>
          <Route path="/" element={<Search />} />
        </Routes>
      </Grid>
      <Grid style={{ position: 'relative', height: '100%' }}>
        <Routes>
          <Route path="/" element={<GoogleMap />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Grid>
    </Grid>
  );
}

export default App;
