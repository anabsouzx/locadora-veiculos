import React, { useEffect, useState } from 'react';
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

            setMensagem('Veículo cadastrado com sucesso!');
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
            <h2>Gerenciamento de Veículos</h2>

            {mensagem && <p style={{ color: 'green' }}>{mensagem}</p>}
            {erro && <p style={{ color: 'red' }}>{erro}</p>}

            <form onSubmit={handleCadastrar} style={{ marginBottom: '24px' }}>
                <h3>Cadastrar Novo Veículo</h3>
                <input type="text" placeholder="Marca" value={marca} onChange={(e) => setMarca(e.target.value)} required />
                <input type="text" placeholder="Modelo" value={modelo} onChange={(e) => setModelo(e.target.value)} required />
                <input type="text" placeholder="Placa" value={placa} onChange={(e) => setPlaca(e.target.value)} required />
                <input type="number" placeholder="Ano" value={ano} onChange={(e) => setAno(e.target.value)} required />
                <input type="number" step="0.01" placeholder="Valor da Diária" value={valorDiaria} onChange={(e) => setValorDiaria(e.target.value)} required />
                <button type="submit">Cadastrar Veículo</button>
            </form>

            <div>
                <h3>Frota</h3>
                <label>
                    <input
                        type="checkbox"
                        checked={apenasDisponiveis}
                        onChange={(e) => setApenasDisponiveis(e.target.checked)}
                    />
                    Mostrar apenas veículos disponíveis
                </label>

                <table border={1} cellPadding={8} style={{ marginTop: '12px', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th>Marca</th>
                            <th>Modelo</th>
                            <th>Placa</th>
                            <th>Ano</th>
                            <th>Diária (R$)</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {veiculos.map((v) => (
                            <tr key={v.id}>
                                <td>{v.marca}</td>
                                <td>{v.modelo}</td>
                                <td>{v.placa}</td>
                                <td>{v.ano}</td>
                                <td>{v.valor_diaria.toFixed(2)}</td>
                                <td>{v.disponibilidade ? 'Disponível' : 'Alugado'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}