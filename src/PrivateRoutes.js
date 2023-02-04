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
                localStorage.setItem('customer_id', res.data.customer_id);
            }
            setLoading(false);
        };
        checkLogin();
        // dispatch({
        //     type: 'LOGIN',
        //     payload: {
        //         state: isAuthenticated,
        //         data: {
        //             customer_id: localStorage.getItem('customer_id'),
        //         },
        //     },
        // });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
