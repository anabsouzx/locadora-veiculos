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
            setMensagem('Locação registrada com sucesso!');
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
            <h2>Registrar Locação</h2>

            {mensagem && <p style={{ color: 'green' }}>{mensagem}</p>}
            {valorCalculado !== null && (
                <p><strong>Valor total calculado: R$ {valorCalculado.toFixed(2)}</strong></p>
            )}
            {erro && <p style={{ color: 'red' }}>{erro}</p>}

            <form onSubmit={handleRegistrar}>
                <div>
                    <label>Veículo Disponível:</label>
                    <select value={veiculoId} onChange={(e) => setVeiculoId(e.target.value)} required>
                        <option value="">Selecione um veículo</option>
                        {veiculosDisponiveis.map((v) => (
                            <option key={v.id} value={v.id}>
                                {v.marca} {v.modelo} - {v.placa} (R$ {v.valor_diaria.toFixed(2)}/dia)
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label>Data de Início:</label>
                    <input type="datetime-local" value={dataInicio} onChange={(e) => setDataInicio(e.target.value)} required />
                </div>

                <div>
                    <label>Data Prevista de Devolução:</label>
                    <input type="datetime-local" value={dataPrevista} onChange={(e) => setDataPrevista(e.target.value)} required />
                </div>

                <button type="submit">Alugar Veículo</button>
            </form>
        </div>
    );
}