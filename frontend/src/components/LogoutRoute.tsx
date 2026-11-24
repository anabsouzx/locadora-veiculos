import { useNavigate } from 'react-router-dom';
import { AuthService } from '../services/AuthService';

export default function Logout() {
    const navigate = useNavigate();

    const handleLogout = () => {
        AuthService.logout();
        navigate('/login');
    };

    return (
        <button className="btn btn-logout" onClick={handleLogout}>
            Sair
        </button>
    );
}