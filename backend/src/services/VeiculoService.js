const prisma = require('../databases/prisma');

const cadastrar = async (dados) => {
    const { marca, modelo, placa, ano, valor_diaria } = dados;
    
    if (valor_diaria <= 0) {
        throw new Error("O valor da diária deve ser positivo");
    }

    const placaExiste = await prisma.veiculo.findUnique({ where: { placa } });
    if (placaExiste) throw new Error("Placa já cadastrada");

    return await prisma.veiculo.create({
        data: { marca, modelo, placa, ano, valor_diaria }
    });
};

const listar = async () => {
    return await prisma.veiculo.findMany();
};

const listarDisponiveis = async () => {
    return await prisma.veiculo.findMany({
        where: { disponibilidade: true }
    });
};

module.exports = { cadastrar, listar, listarDisponiveis };