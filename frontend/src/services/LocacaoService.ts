import { api } from '../api/api';
import type { Locacao, LocacaoForm } from '../types/Locacao';

export const LocacaoService = {
    registrar: async (dados: LocacaoForm): Promise<Locacao> => {
        const resposta = await api.post('/locacoes', dados);
        return resposta.data;
    },
    listarHistorico: async (): Promise<Locacao[]> => {
        const resposta = await api.get('/locacoes');
        return resposta.data;
    },
    finalizar: async (id: number): Promise<Locacao> => {
        const resposta = await api.patch(`/locacoes/${id}/finalizar`);
        return resposta.data;
    }
};