import { Box, Stack, Tooltip, Typography } from '@mui/material';
import { Container } from '@mui/system';
import React from 'react'
import { useSelector } from 'react-redux'
import { format, parseISO } from 'date-fns'
import AdminDashboard from './AdminDashboard';
import UserDashboard from './UserDashboard';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

const Dashboard = () => {

    const { user, loading, isAuthenticated } = useSelector(state => state.user);


    if (loading) {
        return <Typography variant='h1'>Loading</Typography>
    }

    return (
        <>
            {
                isAuthenticated && (
                    <>
                        <Box py={"40px"}>

                            <Container sx={{ marginBottom: "30px" }}>
                                <Stack justifyContent="space-between" direction="row">
                                    <Typography variant='h3' sx={{ color: user.role.includes("admin") && "#1976d2" }}>{user.name}</Typography>
                                    {
                                        user && user.role.includes("admin") && (
                                            <>
                                                <Tooltip
                                                    title={`This is an admin account`}
                                                >
                                                    <AdminPanelSettingsIcon sx={{ fontSize: "3rem" }} />
                                                </Tooltip>
                                            </>
                                        )
                                    }
                                </Stack>


                                {!user.role.includes("admin") && <Typography variant='caption'>{user._id}</Typography>}
                                <Typography variant='h6'>{user.email}</Typography>
                                {!user.role.includes("admin") && <Typography variant='h6'>Customer Since {format(parseISO(user.createdAt), "dd-MMM-yyyy")}</Typography>}
                                <hr style={{ marginBlock: "40px" }} />
                                {
                                    user && !user.role.includes("admin") && (
                                        <>
                                            <Typography variant='h5' sx={{ textDecoration: "underline" }}>Package Info</Typography>
                                            <Typography variant='h6'>Name - {user.subscriptionInfo.planName}</Typography>
                                            <Typography variant='h6'>Price - ${user.subscriptionInfo.planPrice} per screen per month</Typography>
                                            <Typography variant='h6'>Screens - {user.subscriptionInfo.screenCount}</Typography>
                                            <Typography variant='h6'>Device - {user.subscriptionInfo.deviceName}</Typography>
                                            <Typography variant='h6'>Duration - {user.subscriptionInfo.duration} month</Typography>
                                            <Typography variant='h6'>Total Paid - ${user.subscriptionInfo.totalPrice}</Typography>
                                            <hr style={{ marginBlock: "40px" }} />
                                        </>
                                    )
                                }

                            </Container>
                            {user.role.includes("admin") ? <AdminDashboard /> : <UserDashboard />}
                        </Box>

                    </>
                )
            }
        </>
    )
}

export default Dashboard