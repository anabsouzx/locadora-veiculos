import type { Veiculo } from './Veiculo';

export interface Locacao {
    id: number;
    usuarioId: number;
    veiculoId: number;
    data_inicio: string;
    data_prevista: string;
    data_efetiva: string | null;
    valor_total: number;
    status: string;
    veiculo: Veiculo;
}

export interface LocacaoForm {
    veiculoId: number;
    data_inicio: string;
    data_prevista: string;
}