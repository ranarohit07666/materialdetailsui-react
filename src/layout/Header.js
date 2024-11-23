import React, { useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import {  Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button,Stack } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';
import { logout } from '../state/actions/authAction';

export const Header = () => {
    const user = useSelector((state) => state.auth.user);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const state = useSelector((state) => state.auth);
    useEffect(() => {
      localStorage.setItem('globalState', JSON.stringify(state));
    }, [state]);    
    const dispatch = useDispatch();
    const navigate=useNavigate();
    const handleLogout=()=>{
        dispatch(logout())
        navigate('/login');
    }
  
    return (
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Material Deatils Ui
          </Typography>        
            {isAuthenticated ? (
              <>
                <Stack direction="row" spacing={4}>
                <Button color="inherit" component={Link} to="/reference">
                  Material Reference
                </Button> 
                <Avatar sx={{ bgcolor: deepOrange[500] }}>{user?.unique_name?.charAt(0).toUpperCase()}</Avatar>
                <Button color="inherit" onClick={handleLogout}>
                  Logout
                </Button>
                </Stack>
              </>
            ) : (
              <>
                <Button color="inherit" component={Link} to="/login">
                  Login
                </Button>
                <Button color="inherit" component={Link} to="/signup">
                  Signup
                </Button>
              </>
            )}
        </Toolbar>
      </AppBar>
    );
  };
