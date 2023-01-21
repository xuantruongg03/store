import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoutes = () => {
    const state = useSelector((state) => state.login);
    return state ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
