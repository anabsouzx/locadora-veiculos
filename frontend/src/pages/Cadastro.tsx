import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthService } from '../services/AuthService';

export default function Cadastro() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [erro, setErro] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErro('');
        setMensagem('');

        if (senha.length < 6) {
            setErro('A senha deve ter pelo menos 6 caracteres');
            return;
        }

        try {
            await AuthService.register({ nome, email, senha });
            setMensagem('Cadastro realizado com sucesso! Redirecionando...');
            setTimeout(() => navigate('/login'), 1500);
        } catch (err: any) {
            setErro(err.response?.data?.error || 'Erro ao cadastrar usuário');
        }
    };

    return (
        <div>
            <h2>Cadastro de Usuário</h2>
            {mensagem && <p style={{ color: 'green' }}>{mensagem}</p>}
            {erro && <p style={{ color: 'red' }}>{erro}</p>}

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nome:</label>
                    <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
                </div>
                <div>
                    <label>E-mail:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label>Senha:</label>
                    <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required />
                </div>
                <button type="submit">Cadastrar</button>
            </form>

            <p>Já possui conta? <Link to="/login">Faça login</Link></p>
        </div>
    );
}