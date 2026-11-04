import React from "react";

import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Clients from "./pages/Clients";

import {
    AuthProvider,
    useAuth
} from "./context/AuthContext";

import ProtectedRoute from "./components/ProtectedRoute";


const AppRoutes = () => {

    const { isAuthenticated } = useAuth();

    return (

        <Routes>

            <Route
                path="/"
                element={
                    isAuthenticated
                        ? <Navigate to="/dashboard" />
                        : <Login />
                }
            />

            <Route
                path="/login"
                element={
                    isAuthenticated
                        ? <Navigate to="/dashboard" />
                        : <Login />
                }
            />

            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/clients"
                element={
                    <ProtectedRoute>
                        <Clients />
                    </ProtectedRoute>
                }
            />

            <Route
                path="*"
                element={<Navigate to="/" />}
            />

        </Routes>

    );
};


function App() {

    return (

        <BrowserRouter>

            <AuthProvider>

                <AppRoutes />

            </AuthProvider>

        </BrowserRouter>

    );

}

export default App;