import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {

    const { isAuthenticated, loading = true } = useSelector(state => state.user);

    if (loading) {
        return (
            <div></div>
        )
    }

    return (
        <>
            {isAuthenticated ? <Outlet /> : <Navigate to="/login" />}
        </>
    )
}

export default ProtectedRoute