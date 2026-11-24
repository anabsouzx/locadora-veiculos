import React, { useEffect, useState } from 'react';
import Menu from '../components/Menu';
import { VeiculoService } from '../services/VeiculoService';
import { LocacaoService } from '../services/LocacaoService';
import type { Veiculo } from '../types/Veiculo';

export default function Locacoes() {
    const [veiculosDisponiveis, setVeiculosDisponiveis] = useState<Veiculo[]>([]);
    const [veiculoId, setVeiculoId] = useState('');
    const [dataInicio, setDataInicio] = useState('');
    const [dataPrevista, setDataPrevista] = useState('');
    const [valorCalculado, setValorCalculado] = useState<number | null>(null);
    const [mensagem, setMensagem] = useState('');
    const [erro, setErro] = useState('');

    const carregarDisponiveis = async () => {
        try {
            const dados = await VeiculoService.listarDisponiveis();
            setVeiculosDisponiveis(dados);
        } catch (err: any) {
            setErro(err.response?.data?.error || 'Erro ao carregar veículos disponíveis');
        }
    };

    useEffect(() => {
        carregarDisponiveis();
    }, []);

    const handleRegistrar = async (e: React.FormEvent) => {
        e.preventDefault();
        setErro('');
        setMensagem('');
        setValorCalculado(null);

        if (new Date(dataPrevista) <= new Date(dataInicio)) {
            setErro('A data prevista de devolução deve ser posterior à data de início');
            return;
        }

        try {
            const locacao = await LocacaoService.registrar({
                veiculoId: Number(veiculoId),
                data_inicio: dataInicio,
                data_prevista: dataPrevista
            });

            setValorCalculado(locacao.valor_total);
            setMensagem('Locação confirmada! Simplesmente pegue a estrada.');
            setVeiculoId('');
            setDataInicio('');
            setDataPrevista('');
            carregarDisponiveis();
        } catch (err: any) {
            setErro(err.response?.data?.error || 'Erro ao registrar locação');
        }
    };

    return (
        <div>
            <Menu />
            <main className="container">
                <section className="hero-banner">
                    <div className="hero-content">
                        <span className="hero-tag">Vamos pegar a estrada?</span>
                        <h1>Seu destino, suas regras, seu caminho.</h1>
                        <p>
                            Escolha um veículo disponível, defina o período e deixe o cálculo automático com a gente. Qualquer fração de 24h conta como diária completa.
                        </p>
                    </div>
                </section>

                {mensagem && <div className="alert alert-success">{mensagem}</div>}
                {erro && <div className="alert alert-error">{erro}</div>}

                {valorCalculado !== null && (
                    <div className="receipt-box">
                        <div>
                            <p style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>Resumo da sua reserva</p>
                            <h3>Valor total calculado pelo sistema</h3>
                        </div>
                        <strong>R$ {valorCalculado.toFixed(2)}</strong>
                    </div>
                )}

                <section className="card">
                    <h2 className="card-title">Registrar Nova Locação</h2>
                    <p className="card-subtitle">A estrada chama. Você escolhe o destino.</p>

                    <form onSubmit={handleRegistrar}>
                        <div className="form-group">
                            <label>Selecione o Veículo Disponível</label>
                            <select value={veiculoId} onChange={(e) => setVeiculoId(e.target.value)} required>
                                <option value="">Encontre seu próximo carro...</option>
                                {veiculosDisponiveis.map((v) => (
                                    <option key={v.id} value={v.id}>
                                        {v.marca} {v.modelo} ({v.ano}) — Placa {v.placa} — R$ {v.valor_diaria.toFixed(2)}/dia
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-grid" style={{ marginBottom: '20px' }}>
                            <div className="form-group">
                                <label>Data e Hora de Retirada</label>
                                <input
                                    type="datetime-local"
                                    value={dataInicio}
                                    onChange={(e) => setDataInicio(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Data e Hora Prevista de Devolução</label>
                                <input
                                    type="datetime-local"
                                    value={dataPrevista}
                                    onChange={(e) => setDataPrevista(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary">
                            Reserve seu veículo
                        </button>
                    </form>
                </section>
            </main>
        </div>
    );
}