import { Box, Stack, Typography } from '@mui/material'
import { Container } from '@mui/system';
import React from 'react'
import { useSelector } from 'react-redux'

const Home = () => {

    const { user } = useSelector(state => state.user);

    // console.log({ user })


    return (
        <Container>
            <Box sx={{ minWidth: "375px", maxWidth: "1000px", margin: "auto" }} pt={10}>
                <>

                    {user && user.name && <Typography variant='h3' pb={10}>Hello {user.name}</Typography>}
                    <Stack sx={{ gap: "10px" }}>
                        <Typography variant='h5'>
                            1. This is a  demonstration of the payment flow of the stripe payment minus the site design. Its basically showcases the same functionality without the UI Elements. This is for pupose of testing out the requirements of DISPLAY LAB subscription data
                        </Typography>
                        <Typography variant='h5'>
                            2. Click on one of the links to login/register.
                        </Typography>
                        <hr />
                        <Typography variant='h5'>
                            N.B.{" ->"} Prefilled login data is of admin. Log into that to see the various users who have created accounts over here.
                        </Typography>
                    </Stack>
                </>
            </Box>
        </Container>
    )
}

export default Home