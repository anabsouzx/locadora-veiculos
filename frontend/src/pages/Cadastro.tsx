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
            setMensagem('Conta criada com sucesso! Redirecionando para o login...');
            setTimeout(() => navigate('/login'), 1500);
        } catch (err: any) {
            setErro(err.response?.data?.error || 'Erro ao cadastrar usuário');
        }
    };

    return (
        <div className="auth-page">
            <section className="auth-showcase">
                <div>
                    <p className="auth-slogan">Liberdade sobre quatro rodas.</p>
                    <h1>A liberdade de ir mais longe está a um clique.</h1>
                    <p>
                        Viajar fica muito melhor quando você tem tranquilidade em cada quilômetro. Conte com a gente para encontrar o veículo ideal para sua próxima jornada.
                    </p>
                </div>
                <p className="auth-footer-note">
                    Cada viagem tem uma história. Comece a sua.
                </p>
            </section>

            <section className="auth-form-panel">
                <div className="auth-card">
                    <h2>Criar sua conta</h2>
                    <p className="card-subtitle">Boas experiências começam com a chave certa.</p>

                    {mensagem && <div className="alert alert-success">{mensagem}</div>}
                    {erro && <div className="alert alert-error">{erro}</div>}

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Nome completo</label>
                            <input
                                type="text"
                                placeholder="Seu nome"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                required
                            />
                        </div>

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
                                placeholder="Mínimo de 6 caracteres"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                required
                            />
                        </div>

                        <button type="submit" className="btn btn-primary">
                            Garanta sua viagem
                        </button>
                    </form>

                    <p className="auth-switch">
                        Já possui conta? <Link to="/login">Faça login</Link>
                    </p>
                </div>
            </section>
        </div>
    );
}