import React, { createContext, useContext, useState } from "react";
import API from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem("user");
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const [loading, setLoading] = useState(false);

    // LOGIN FUNCTION
    const login = async (email, password) => {
        try {
            setLoading(true);

            const response = await API.post("/auth/login", {
                email,
                password
            });

            const { token, user } = response.data;

            // Store token and user details
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));

            setUser(user);

            return {
                success: true,
                message: response.data.message
            };

        } catch (error) {

            return {
                success: false,
                message: error.response?.data?.message || "Login failed"
            };

        } finally {
            setLoading(false);
        }
    };


    // LOGOUT FUNCTION
    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setUser(null);
    };


    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                logout,
                isAuthenticated: !!user
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};


// CUSTOM HOOK
export const useAuth = () => {
    return useContext(AuthContext);
};