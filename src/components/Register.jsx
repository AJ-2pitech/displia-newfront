import { Box, Button, FilledInput, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register } from "../actions/userActions";
import { Field, Form, Formik } from 'formik';
import { Container } from '@mui/system';

const Register = () => {

    const navigate = useNavigate()

    const dispatch = useDispatch();
    const { isAuthenticated, error, loading } = useSelector(state => state.user)

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleFormSubmit = async e => {
        // console.log({ e })

        dispatch(register(e))
    }

    const initialValues = {
        email: "",
        password: "",
        name: ""
    }

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/dashboard")
        }
    }, [isAuthenticated]);

    return (
        <Container>
            <Box p={20} py={20} sx={{ minWidth: "375px", maxWidth: "600px", margin: "auto" }
            } >

                <Formik
                    onSubmit={handleFormSubmit}
                    initialValues={initialValues}
                >
                    {props => {
                        return (
                            <>
                                <Form>
                                    <Stack direction={"column"} sx={{ gap: "3rem" }}>
                                        <Field name="name">
                                            {
                                                props => {
                                                    return (
                                                        <>
                                                            <FormControl variant="outlined">
                                                                <InputLabel htmlFor='name'>Name</InputLabel>
                                                                <FilledInput
                                                                    {...props.field}
                                                                    required
                                                                    type={"text"}
                                                                ></FilledInput>
                                                            </FormControl>
                                                        </>
                                                    )
                                                }
                                            }
                                        </Field>
                                        <Field name="email">
                                            {
                                                props => {
                                                    return (
                                                        <>
                                                            <FormControl variant="outlined">
                                                                <InputLabel htmlFor='email'>Email</InputLabel>
                                                                <FilledInput
                                                                    required
                                                                    {...props.field}
                                                                    type={"email"}
                                                                ></FilledInput>
                                                            </FormControl>
                                                        </>
                                                    )
                                                }
                                            }
                                        </Field>
                                        <Field name="password">
                                            {
                                                props => {
                                                    return (
                                                        <>
                                                            <FormControl variant="outlined">
                                                                <InputLabel htmlFor='password'>Password</InputLabel>
                                                                <FilledInput
                                                                    required
                                                                    {...props.field}
                                                                    type={showPassword ? "password" : "text"}
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
                                            }
                                        </Field>

                                        <Button type='submit' variant='contained' sx={{ padding: "15px" }}>SUBMIT</Button>
                                    </Stack>
                                </Form>
                            </>
                        )
                    }}
                </Formik>
            </Box >
        </Container>
    )
}

export default Register