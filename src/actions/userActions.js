import axiosInstance from "../config/api";

import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL, REGISTER_USER_FAIL, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, LOAD_USER_FAIL, LOAD_USER_SUCCESS, LOGOUT_SUCCESS, LOGOUT_FAIL, LOAD_USER_REQUEST, ALL_USERS_FAIL, ALL_USERS_REQUEST, ALL_USERS_SUCCESS, CUSTOMER_DETAILS_REQUEST, CUSTOMER_DETAILS_SUCCESS, CUSTOMER_DETAILS_FAIL } from "../constants/userConstants";

// Login
export const login = (email, password) => async dispatch => {
    try {
        dispatch({ type: LOGIN_REQUEST })

        const config = {
            headers: { "Content-Type": "application/json" }
        }

        const { data } = await axiosInstance.post("/login", { email, password }, config);

        // console.log({ data })



        await dispatch({ type: LOGIN_SUCCESS, payload: data.user })

        document.cookie = `jwttoken=${data.jwttoken}`;
        // window.location.reload()
    } catch (error) {
        dispatch({ type: LOGIN_FAIL, payload: error.message })
    }
}

// Register
export const register = userData => async dispatch => {
    try {
        dispatch({ type: REGISTER_USER_REQUEST });

        const config = {
            headers: { "Content-Type": "application/json" }
        }

        const { data } = await axiosInstance.post("/register", userData, config);



        await dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user })

        document.cookie = `jwttoken=${data.jwttoken}`;



    } catch (error) {
        dispatch({ type: REGISTER_USER_FAIL, payload: error.message })
    }
}

// Load User
export const loadUser = () => async dispatch => {



    try {
        dispatch({ type: LOAD_USER_REQUEST });

        const { data } = await axiosInstance.get(`/me/${document.cookie.split("=")[1]}`);

        dispatch({ type: LOAD_USER_SUCCESS, payload: data.user })

    } catch (error) {
        dispatch({
            type: LOAD_USER_FAIL,
            payload: error.message
        })
    }
}

// Logout User
export const logout = () => async dispatch => {
    try {
        await axiosInstance.get("/logout");

        dispatch({ type: LOGOUT_SUCCESS })

        document.cookie = `jwttoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; `;

    } catch (error) {
        dispatch({ type: LOGOUT_FAIL, payload: error.message })
    }
}

export const getAllUsers = () => async dispatch => {
    try {
        dispatch({
            type: ALL_USERS_REQUEST
        });

        const { data } = await axiosInstance.get(`/admin/users/${document.cookie.split("=")[1]}`);

        dispatch({
            type: ALL_USERS_SUCCESS,
            payload: data.users
        })
    } catch (error) {
        dispatch({
            type: ALL_USERS_FAIL,
            payload: error.message
        })
    }
}

export const getCustomerDetails = (id) => async dispatch => {
    try {
        dispatch({
            type: CUSTOMER_DETAILS_REQUEST
        });

        const { data } = await axiosInstance.get(`/admin/user/${id}/${document.cookie.split("=")[1]}`);

        dispatch({ type: CUSTOMER_DETAILS_SUCCESS, payload: data.user });

    } catch (error) {
        dispatch({
            type: CUSTOMER_DETAILS_FAIL,
            payload: error.message
        });
    }
}