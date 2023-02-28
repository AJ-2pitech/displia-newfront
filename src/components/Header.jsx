import { AppBar, Button, Stack, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../actions/userActions'

const Header = () => {

    const { isAuthenticated } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = () => {
        dispatch(logout());
        navigate("/")
    }

    return (
        <AppBar position="static">
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                <Button variant="outlined">
                    <Link to="/" style={{ color: "white", textDecoration: "none" }}>
                        <Typography variant="h2" color="white" sx={{ flexGrow: 1 }}>LOGO</Typography></Link>
                </Button>
                <Stack direction="row" spacing={2}>
                    {
                        !isAuthenticated ? (
                            <>
                                <Button color="inherit">
                                    <Link to="/login" style={{ color: "white", textDecoration: "none" }}>LOGIN</Link>
                                </Button>
                                <Button color="inherit">
                                    <Link to="/register" style={{ color: "white", textDecoration: "none" }}>REGISTER</Link>
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button color="inherit">
                                    <Link to="/dashboard" style={{ color: "white", textDecoration: "none" }}>DASHBOARD</Link>
                                </Button>
                                <Button color="inherit" onClick={logoutHandler}>
                                    LOGOUT
                                </Button>
                            </>
                        )
                    }

                </Stack>
            </Toolbar>
        </AppBar >
    )
}

export default Header