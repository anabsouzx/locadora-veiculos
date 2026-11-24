import { Link, useLocation } from 'react-router-dom';
import { getUsuarioLogado } from '../utils/jwt';
import Logout from './LogoutRoute';

export default function Menu() {
    const usuario = getUsuarioLogado();
    const location = useLocation();

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <strong>RotaLivre</strong>
                <span>Sua jornada, nossa direção.</span>
            </div>

            <div className="navbar-links">
                <Link to="/veiculos" className={location.pathname === '/veiculos' ? 'active' : ''}>
                    Conheça nossa frota
                </Link>
                <Link to="/locacoes" className={location.pathname === '/locacoes' ? 'active' : ''}>
                    Reserve seu veículo
                </Link>
                <Link to="/historico" className={location.pathname === '/historico' ? 'active' : ''}>
                    Minhas viagens
                </Link>
            </div>

            <div className="navbar-user">
                <span className="user-pill">{usuario?.email}</span>
                <Logout />
            </div>
        </nav>
    );
}