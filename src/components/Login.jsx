import { Box, Button, FilledInput, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Formik, Form, Field } from "formik";
import axiosInstance from '../config/api';
import { login } from "../actions/userActions";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Container } from '@mui/system';

const Login = () => {

    const navigate = useNavigate()

    const dispatch = useDispatch();
    const { isAuthenticated, error, loading } = useSelector(state => state.user)

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleFormSubmit = async e => {

        dispatch(login(e.email, e.password));
        navigate("/dashboard")
    }

    const initialValues = {
        email: "dev@2pi.tech",
        password: "12345678"
    }

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/dashboard")
        }
    }, [isAuthenticated]);

    return (
        <Container>
            <Box py={20} sx={{ minWidth: "375px", maxWidth: "600px", margin: "auto" }
            } >

                <Formik
                    onSubmit={handleFormSubmit}
                    initialValues={initialValues}
                >
                    {
                        (props) => {

                            return (
                                <Form>

                                    <Stack direction={"column"} sx={{ gap: "3rem" }}>
                                        <Field name="email">
                                            {
                                                (props) => {

                                                    return (
                                                        <>
                                                            <FormControl variant="outlined">
                                                                <InputLabel htmlFor='email'>Email</InputLabel>
                                                                <FilledInput
                                                                    required
                                                                    type={"email"}
                                                                    {...props.field}
                                                                ></FilledInput>
                                                            </FormControl>
                                                        </>
                                                    )
                                                }
                                            }
                                        </Field>

                                        <Field name="password">
                                            {
                                                (props) => (
                                                    <>
                                                        <FormControl variant="outlined">
                                                            <InputLabel htmlFor='password'>Password</InputLabel>
                                                            <FilledInput
                                                                required
                                                                {...props.field}
                                                                type={showPassword ? "text" : "password"}
                                                                endAdornment={
                                                                    <InputAdornment position='end'>
                                                                        <IconButton
                                                                            aria-label="toggle password visibility"
                                                                            onClick={handleClickShowPassword}
                                                                            onMouseDown={handleMouseDownPassword}
                                                                            edge="end"
                                                                        >{showPassword ? <VisibilityOff /> : <Visibility />}</IconButton>
                                                                    </InputAdornment>
                                                                }
                                                            ></FilledInput>
                                                        </FormControl>

                                                    </>
                                                )
                                            }
                                        </Field>

                                        <Button type='submit' variant='contained' sx={{ padding: "15px" }}>SUBMIT</Button>
                                    </Stack>

                                </Form>
                            )
                        }
                    }
                </Formik>
            </Box >
        </Container >
    )
}

export default Login