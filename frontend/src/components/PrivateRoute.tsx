import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/jwt';
import type { JSX } from 'react/jsx-runtime';

interface PrivateRouteProps {
    children: JSX.Element;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
    return isAuthenticated() ? children : <Navigate to="/login" />;
}