import { useEffect, useState } from 'react';
import Menu from '../components/Menu';
import { LocacaoService } from '../services/LocacaoService';
import type { Locacao } from '../types/Locacao';

export default function Historico() {
    const [locacoes, setLocacoes] = useState<Locacao[]>([]);
    const [mensagem, setMensagem] = useState('');
    const [erro, setErro] = useState('');

    const carregarHistorico = async () => {
        try {
            const dados = await LocacaoService.listarHistorico();
            setLocacoes(dados);
        } catch (err: any) {
            setErro(err.response?.data?.error || 'Erro ao carregar histórico');
        }
    };

    useEffect(() => {
        carregarHistorico();
    }, []);

    const handleFinalizar = async (id: number) => {
        setErro('');
        setMensagem('');

        try {
            await LocacaoService.finalizar(id);
            setMensagem('Locação finalizada e veículo devolvido com sucesso!');
            carregarHistorico();
        } catch (err: any) {
            setErro(err.response?.data?.error || 'Erro ao finalizar locação');
        }
    };

    const ativas = locacoes.filter((l) => l.status === 'ATIVA').length;
    const finalizadas = locacoes.filter((l) => l.status === 'FINALIZADA').length;

    return (
        <div>
            <Menu />
            <main className="container">
                <section className="hero-banner">
                    <div className="hero-content">
                        <span className="hero-tag">Transforme quilômetros em boas lembranças</span>
                        <h1>Meu Histórico de Locações</h1>
                        <p>
                            Acompanhe suas viagens ativas, consulte valores e realize a devolução dos veículos de forma rápida.
                        </p>
                    </div>
                </section>

                <section className="stats-row">
                    <div className="stat-card">
                        <span>Total de Locações</span>
                        <strong>{locacoes.length}</strong>
                    </div>
                    <div className="stat-card">
                        <span>Locações Ativas</span>
                        <strong>{ativas}</strong>
                    </div>
                    <div className="stat-card">
                        <span>Locações Finalizadas</span>
                        <strong>{finalizadas}</strong>
                    </div>
                </section>

                {mensagem && <div className="alert alert-success">{mensagem}</div>}
                {erro && <div className="alert alert-error">{erro}</div>}

                <section className="card">
                    <h2 className="card-title">Registros de Viagens</h2>
                    <p className="card-subtitle">Seu tempo vale muito. Sua mobilidade também.</p>

                    <div className="table-wrapper">
                        <table className="styled-table">
                            <thead>
                                <tr>
                                    <th>Veículo</th>
                                    <th>Placa</th>
                                    <th>Início</th>
                                    <th>Devolução Prevista</th>
                                    <th>Devolução Efetiva</th>
                                    <th>Valor Total</th>
                                    <th>Status</th>
                                    <th>Ação</th>
                                </tr>
                            </thead>
                            <tbody>
                                {locacoes.map((loc) => (
                                    <tr key={loc.id}>
                                        <td><strong>{loc.veiculo.marca} {loc.veiculo.modelo}</strong></td>
                                        <td>{loc.veiculo.placa}</td>
                                        <td>{new Date(loc.data_inicio).toLocaleString()}</td>
                                        <td>{new Date(loc.data_prevista).toLocaleString()}</td>
                                        <td>{loc.data_efetiva ? new Date(loc.data_efetiva).toLocaleString() : '—'}</td>
                                        <td><strong>R$ {loc.valor_total.toFixed(2)}</strong></td>
                                        <td>
                                            <span className={`badge ${loc.status === 'ATIVA' ? 'badge-active' : 'badge-finished'}`}>
                                                {loc.status}
                                            </span>
                                        </td>
                                        <td>
                                            {loc.status === 'ATIVA' ? (
                                                <button
                                                    className="btn btn-primary"
                                                    style={{ padding: '6px 14px', fontSize: '0.82rem' }}
                                                    onClick={() => handleFinalizar(loc.id)}
                                                >
                                                    Devolver
                                                </button>
                                            ) : (
                                                <span style={{ color: '#64748b', fontSize: '0.85rem' }}>Encerrada</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>
        </div>
    );
}