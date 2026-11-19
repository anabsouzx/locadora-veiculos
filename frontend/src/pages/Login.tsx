import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthService } from '../services/AuthService';

export default function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setErro('');

        try {
            await AuthService.login({ email, senha });
            navigate('/veiculos');
        } catch (err: any) {
            setErro(err.response?.data?.error || 'Credenciais inválidas');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            {erro && <p style={{ color: 'red' }}>{erro}</p>}

            <form onSubmit={handleLogin}>
                <div>
                    <label>E-mail:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label>Senha:</label>
                    <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required />
                </div>
                <button type="submit">Entrar</button>
            </form>

            <p>Não tem conta? <Link to="/cadastro">Cadastre-se</Link></p>
        </div>
    );
}