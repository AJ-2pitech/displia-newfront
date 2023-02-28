import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useMatch, useParams } from "react-router-dom";
import { getCustomerDetails } from '../actions/userActions';
import { Box, Stack, Tooltip, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { format, parseISO } from 'date-fns'

const CustomerDetails = () => {

    const dispatch = useDispatch();
    const { user, loading } = useSelector(state => state.customerDetails)


    const { id } = useParams();
    const location = useLocation();
    // console.log({ location })

    useEffect(() => {
        dispatch(getCustomerDetails(id))
    }, [id, location.pathname, dispatch]);

    if (loading) {
        return (
            <Typography></Typography>
        )
    }

    return (
        <>
            {/* <pre>{JSON.stringify(user, null, 4)}</pre> */}



            {user && user.subscriptionInfo && (
                <>
                    <Box py={"40px"}>

                        <Container sx={{ marginBottom: "30px" }}>
                            <Stack justifyContent="space-between" direction="row">
                                <Typography variant='h3' sx={{ color: "#1976d2" }}>{user.name}</Typography>

                            </Stack>

                            <Typography variant='caption'>{user._id}</Typography>
                            <Typography variant='h6'>{user.email}</Typography>
                            <Typography variant='h6'>Customer Since {format(parseISO(user.createdAt), "dd-MMM-yyyy")}</Typography>
                            <hr style={{ marginBlock: "40px" }} />

                            <Typography variant='h5' sx={{ textDecoration: "underline" }}>Package Info</Typography>
                            <Typography variant='h6'>Name - {user.subscriptionInfo.planName}</Typography>
                            <Typography variant='h6'>Price - ${user.subscriptionInfo.planPrice} per screen per month</Typography>
                            <Typography variant='h6'>Screens - {user.subscriptionInfo.screenCount}</Typography>
                            <Typography variant='h6'>Device - {user.subscriptionInfo.deviceName}</Typography>
                            <Typography variant='h6'>Duration - {user.subscriptionInfo.duration} month</Typography>
                            <Typography variant='h6'>Total Paid - ${user.subscriptionInfo.totalPrice}</Typography>
                            <hr style={{ marginBlock: "40px" }} />
                        </Container>

                    </Box>
                </>
            )}




        </>
    )
}

export default CustomerDetails