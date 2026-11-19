import { api } from '../api/api';
import type { Veiculo, VeiculoForm } from '../types/Veiculo';

export const VeiculoService = {
    cadastrar: async (dados: VeiculoForm): Promise<Veiculo> => {
        const resposta = await api.post('/veiculos', dados);
        return resposta.data;
    },
    listar: async (): Promise<Veiculo[]> => {
        const resposta = await api.get('/veiculos');
        return resposta.data;
    },
    listarDisponiveis: async (): Promise<Veiculo[]> => {
        const resposta = await api.get('/veiculos/disponiveis');
        return resposta.data;
    }
};