import { Link } from 'react-router-dom';
import { getUsuarioLogado } from '../utils/jwt';
import Logout from './LogoutRoute';

export default function Menu() {
    const usuario = getUsuarioLogado();

    return (
        <nav style={{ display: 'flex', gap: '16px', padding: '12px', borderBottom: '1px solid #ccc', marginBottom: '20px' }}>
            <Link to="/veiculos">Veículos</Link>
            <Link to="/locacoes">Nova Locação</Link>
            <Link to="/historico">Meu Histórico</Link>
            <span style={{ marginLeft: 'auto' }}>Usuário: {usuario?.email}</span>
            <Logout />
        </nav>
    );
}