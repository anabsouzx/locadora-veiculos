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

    return (
        <div>
            <Menu />
            <h2>Meu Histórico de Locações</h2>

            {mensagem && <p style={{ color: 'green' }}>{mensagem}</p>}
            {erro && <p style={{ color: 'red' }}>{erro}</p>}

            <table border={1} cellPadding={8} style={{ borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th>Veículo</th>
                        <th>Placa</th>
                        <th>Início</th>
                        <th>Devolução Prevista</th>
                        <th>Devolução Efetiva</th>
                        <th>Valor Total (R$)</th>
                        <th>Status</th>
                        <th>Ação</th>
                    </tr>
                </thead>
                <tbody>
                    {locacoes.map((loc) => (
                        <tr key={loc.id}>
                            <td>{loc.veiculo.marca} {loc.veiculo.modelo}</td>
                            <td>{loc.veiculo.placa}</td>
                            <td>{new Date(loc.data_inicio).toLocaleString()}</td>
                            <td>{new Date(loc.data_prevista).toLocaleString()}</td>
                            <td>{loc.data_efetiva ? new Date(loc.data_efetiva).toLocaleString() : '-'}</td>
                            <td>{loc.valor_total.toFixed(2)}</td>
                            <td>{loc.status}</td>
                            <td>
                                {loc.status === 'ATIVA' ? (
                                    <button onClick={() => handleFinalizar(loc.id)}>Finalizar</button>
                                ) : (
                                    <span>Encerrada</span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}