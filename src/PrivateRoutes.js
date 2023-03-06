import { Navigate, Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { checkTokenAPI } from './api/login';
// import { useDispatch } from 'react-redux';

const PrivateRoutes = () => {
    // const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkLogin = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                const res = await checkTokenAPI();
                setIsAuthenticated(res.login);
            }
            setLoading(false);
        };
        checkLogin();
        
    }, []);
    if (loading) {
        return <div className='box-loader'><span className="loader"></span></div>;
    }
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
