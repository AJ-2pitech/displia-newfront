import { Box, Button, Typography, IconButton, Tooltip, } from '@mui/material';
import React, { useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from '../actions/userActions';
import { Link, useNavigate } from 'react-router-dom';
import LinkIcon from '@mui/icons-material/Link';
import TouchAppRoundedIcon from "@mui/icons-material/TouchAppRounded";
import { Container } from '@mui/system';
import { format, parseISO } from 'date-fns';
import { Skeleton } from '@mui/material';

const AdminDashboard = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();
    const { loading = true, users = [] } = useSelector(state => state.allUsers)

    useEffect(() => {
        dispatch(getAllUsers())
    }, []);

    if (loading) {
        return (
            <Typography variant='h1'></Typography>
        )
    }

    const columns = [
        {
            field: "_id",
            headerName: "ID",
            width: 80,
            renderCell: params => {

                return params.row._id.substring(4, 12)
            }

        },
        {
            field: 'actions',
            headerName: 'Actions',
            renderCell: params => {
                // console.log(params);
                return (

                    <Tooltip
                        title={`Click to See ${params.row.name}'s details`}>
                        <Link to={`customer/${params.id}`}>
                            <IconButton
                                variant='outlined'
                                sx={{ display: "flex", justifyContent: "center", color: "#1976d2" }}
                            >
                                <TouchAppRoundedIcon />
                            </IconButton>
                        </Link>
                    </Tooltip>
                )
            }

        },
        {
            field: "name",
            headerName: "NAME",
            width: "150"
        },
        {

            headerName: "PLAN NAME",
            width: "140",
            renderCell: param => {
                return param.row.subscriptionInfo.planName
            }
        },
        {
            field: "email",
            headerName: "EMAIL",
            width: "250"
        },
        {
            field: "createdAt",
            headerName: "Created At",
            width: "100",
            renderCell: param => {
                return format(parseISO(param.row.createdAt), "dd MMM yyyy")
            }
        }
    ]


    function getRowIdHandler(param) {
        return param._id
    }



    return (
        <>

            <>
                {/* <pre>{JSON.stringify(users, null, 4)}</pre> */}
                <Container>
                    <Box sx={{ height: 400, width: '100%' }}>
                        {users.length > 0 || loading ? <DataGrid
                            rows={users}
                            columns={columns}
                            getRowId={getRowIdHandler}
                        /> : (
                            <Skeleton variant="rectangular" width="100%" height={400} />
                        )}
                        {/* <Skeleton variant="rectangular" width="100%" height={400} /> */}
                    </Box>
                </Container>
            </>

        </>
    )
}

export default AdminDashboard