import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AppBar, Button, Stack, Toolbar, Typography } from "@mui/material";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loadUser, logout } from "./actions/userActions";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import store from "./store";
import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";
import CustomerDetails from "./components/CustomerDetails";
import { usa_key, india_key } from "./config/stripePublicKeys";

function App() {

  const stripePromise = loadStripe(usa_key)

  const { isAuthenticated, user, loading } = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    store.dispatch(loadUser())
  }, []);

  return (
    <div className="App">
      {/* <Elements stripe={stripePromise}> */}
      <Router>
        <Header />
        {
          loading ? <Typography variant="h1"></Typography> : (
            <>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/*" element={<ProtectedRoute />}>
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="dashboard/customer/:id" element={<CustomerDetails />} />
                </Route>
              </Routes>
            </>
          )
        }

      </Router>
      {/* </Elements> */}
    </div>
  )
}

export default App
