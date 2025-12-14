import { useContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { authcontext } from '../../context/authcontext';
import axios from 'axios';
import API_BASE_URL from '../api';
import { toast } from 'react-toastify';

export const useAuth = () => {
    const { isLoggedIn, userRole, setIsLoggedIn, setUserRole } = useContext(authcontext);
    const navigate = useNavigate();

    const login = useCallback(async (credentials) => {
        try {
            const res = await axios.post(`${API_BASE_URL}/auth/sign-in`, credentials);
            localStorage.setItem('user', JSON.stringify(res.data));
            localStorage.setItem('token', res.data.token);
            setIsLoggedIn(true);
            setUserRole(res.data.data.role || 'user');

            // Redirect based on role
            const role = res.data.data.role;
            if (role === 'superadmin') {
                navigate('/superadmin-dashboard');
            } else if (role === 'admin') {
                navigate('/admin-dashboard');
            } else {
                navigate('/user-dashboard');
            }

            return { success: true };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Login failed'
            };
        }
    }, [setIsLoggedIn, setUserRole, navigate]);

    const logout = useCallback(() => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        setUserRole(null);
        navigate('/');
    }, [setIsLoggedIn, setUserRole, navigate]);

    const checkAuth = useCallback(() => {
        const user = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        if (user && token) {
            try {
                const userData = JSON.parse(user);
                setIsLoggedIn(true);
                setUserRole(userData.data?.role || 'user');
                return true;
            } catch (error) {
                logout();
                return false;
            }
        }
        return false;
    }, [setIsLoggedIn, setUserRole, logout]);

    return {
        isLoggedIn,
        userRole,
        login,
        logout,
        checkAuth
    };
};
