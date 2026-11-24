import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Menu from '../components/Menu';
import { VeiculoService } from '../services/VeiculoService';
import type { Veiculo } from '../types/Veiculo';

export default function Veiculos() {
    const [veiculos, setVeiculos] = useState<Veiculo[]>([]);
    const [apenasDisponiveis, setApenasDisponiveis] = useState(false);
    const [marca, setMarca] = useState('');
    const [modelo, setModelo] = useState('');
    const [placa, setPlaca] = useState('');
    const [ano, setAno] = useState('');
    const [valorDiaria, setValorDiaria] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [erro, setErro] = useState('');

    const carregarVeiculos = async (filtrarDisponiveis: boolean) => {
        try {
            const dados = filtrarDisponiveis
                ? await VeiculoService.listarDisponiveis()
                : await VeiculoService.listar();
            setVeiculos(dados);
        } catch (err: any) {
            setErro(err.response?.data?.error || 'Erro ao carregar veículos');
        }
    };

    useEffect(() => {
        carregarVeiculos(apenasDisponiveis);
    }, [apenasDisponiveis]);

    const handleCadastrar = async (e: React.FormEvent) => {
        e.preventDefault();
        setErro('');
        setMensagem('');

        try {
            await VeiculoService.cadastrar({
                marca,
                modelo,
                placa,
                ano: Number(ano),
                valor_diaria: Number(valorDiaria)
            });

            setMensagem('Veículo cadastrado com sucesso na frota!');
            setMarca('');
            setModelo('');
            setPlaca('');
            setAno('');
            setValorDiaria('');
            carregarVeiculos(apenasDisponiveis);
        } catch (err: any) {
            setErro(err.response?.data?.error || 'Erro ao cadastrar veículo');
        }
    };

    return (
        <div>
            <Menu />
            <main className="container">
                <section className="hero-banner">
                    <div className="hero-content">
                        <span className="hero-tag">Mobilidade que acompanha você</span>
                        <h1>O carro certo para cada caminho.</h1>
                        <p>
                            Não deixe seus planos para depois! Escolha seu carro, prepare as malas e aproveite a liberdade de ir para onde quiser.
                        </p>
                    </div>
                    <Link to="/locacoes" className="btn btn-primary">
                        Quero alugar agora
                    </Link>
                </section>

                <section className="categories-strip">
                    <div className="category-card">
                        <h4>Carros Executivos</h4>
                        <p>Elegância e conforto para acompanhar seus melhores momentos.</p>
                    </div>
                    <div className="category-card">
                        <h4>Carros Econômicos</h4>
                        <p>Economia inteligente para você aproveitar cada quilômetro.</p>
                    </div>
                    <div className="category-card">
                        <h4>SUVs</h4>
                        <p>Mais espaço, mais conforto e liberdade para explorar.</p>
                    </div>
                    <div className="category-card">
                        <h4>Picapes</h4>
                        <p>Força e versatilidade para qualquer desafio.</p>
                    </div>
                </section>

                <section className="card">
                    <h2 className="card-title">Cadastrar Novo Veículo</h2>
                    <p className="card-subtitle">Adicione novos modelos à frota para disponibilizá-los para locação.</p>

                    {mensagem && <div className="alert alert-success">{mensagem}</div>}
                    {erro && <div className="alert alert-error">{erro}</div>}

                    <form onSubmit={handleCadastrar} className="form-grid">
                        <div className="form-group">
                            <label>Marca</label>
                            <input type="text" placeholder="Ex: Toyota" value={marca} onChange={(e) => setMarca(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label>Modelo</label>
                            <input type="text" placeholder="Ex: Corolla" value={modelo} onChange={(e) => setModelo(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label>Placa</label>
                            <input type="text" placeholder="ABC1D23" value={placa} onChange={(e) => setPlaca(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label>Ano</label>
                            <input type="number" placeholder="2024" value={ano} onChange={(e) => setAno(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label>Diária (R$)</label>
                            <input type="number" step="0.01" placeholder="220.00" value={valorDiaria} onChange={(e) => setValorDiaria(e.target.value)} required />
                        </div>
                        <button type="submit" className="btn btn-dark">
                            Cadastrar
                        </button>
                    </form>
                </section>

                <section>
                    <div className="section-header">
                        <div>
                            <h2 className="card-title">Nossa Frota</h2>
                            <p className="card-subtitle" style={{ marginBottom: 0 }}>
                                Viajar bem começa com uma boa escolha.
                            </p>
                        </div>

                        <label className="filter-toggle">
                            <input
                                type="checkbox"
                                checked={apenasDisponiveis}
                                onChange={(e) => setApenasDisponiveis(e.target.checked)}
                            />
                            Apenas veículos disponíveis
                        </label>
                    </div>

                    <div className="vehicles-grid">
                        {veiculos.map((v) => (
                            <article key={v.id} className="vehicle-card">
                                <div>
                                    <div className="vehicle-top">
                                        <div>
                                            <div className="vehicle-brand">{v.marca}</div>
                                            <div className="vehicle-model">{v.modelo}</div>
                                        </div>
                                        <span className={`badge ${v.disponibilidade ? 'badge-available' : 'badge-rented'}`}>
                                            {v.disponibilidade ? 'Disponível' : 'Alugado'}
                                        </span>
                                    </div>
                                    <div className="vehicle-meta">
                                        <span>Placa: <strong>{v.placa}</strong></span>
                                        <span>Ano: <strong>{v.ano}</strong></span>
                                    </div>
                                </div>

                                <div className="vehicle-price">
                                    <div>
                                        <strong>R$ {v.valor_diaria.toFixed(2)}</strong>
                                        <span> / diária</span>
                                    </div>
                                    {v.disponibilidade && (
                                        <Link to="/locacoes" className="btn btn-primary" style={{ padding: '6px 14px', fontSize: '0.82rem' }}>
                                            Alugar
                                        </Link>
                                    )}
                                </div>
                            </article>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
}