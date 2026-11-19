import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/jwt';
import type { JSX } from 'react/jsx-runtime';

interface LoginRouteProps {
    children: JSX.Element;
}

export default function LoginRoute({ children }: LoginRouteProps) {
    return isAuthenticated() ? <Navigate to="/veiculos" /> : children;
}