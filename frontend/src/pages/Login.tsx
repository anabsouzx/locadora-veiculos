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
        <div className="auth-page">
            <section className="auth-showcase">
                <div>
                    <p className="auth-slogan">Alugue. Dirija. Aproveite.</p>
                    <h1>Sua próxima viagem começa aqui.</h1>
                    <p>
                        Sem complicação, sem perder tempo. Encontre o carro ideal para sua necessidade e aproveite cada momento do seu caminho.
                    </p>
                </div>
                <p className="auth-footer-note">
                    O caminho é seu. A gente cuida das chaves.
                </p>
            </section>

            <section className="auth-form-panel">
                <div className="auth-card">
                    <h2>Entrar na RotaLivre</h2>
                    <p className="card-subtitle">Seu carro está esperando por você.</p>

                    {erro && <div className="alert alert-error">{erro}</div>}

                    <form onSubmit={handleLogin}>
                        <div className="form-group">
                            <label>E-mail</label>
                            <input
                                type="email"
                                placeholder="voce@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Senha</label>
                            <input
                                type="password"
                                placeholder="Digite sua senha"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                required
                            />
                        </div>

                        <button type="submit" className="btn btn-primary">
                            Comece sua jornada
                        </button>
                    </form>

                    <p className="auth-switch">
                        Ainda não tem conta? <Link to="/cadastro">Cadastre-se agora</Link>
                    </p>
                </div>
            </section>
        </div>
    );
}