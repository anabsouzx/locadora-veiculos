export interface Veiculo {
    id: number;
    marca: string;
    modelo: string;
    placa: string;
    ano: number;
    valor_diaria: number;
    disponibilidade: boolean;
}

export interface VeiculoForm {
    marca: string;
    modelo: string;
    placa: string;
    ano: number;
    valor_diaria: number;
}