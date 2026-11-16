const prisma = require('../databases/prisma');

const registrarLocacao = async (usuarioId, veiculoId, data_inicio, data_prevista) => {
    const inicio = new Date(data_inicio);
    const prevista = new Date(data_prevista);

    if (prevista <= inicio) {
        throw new Error("A data de devolução deve ser posterior ao início");
    }

    return await prisma.$transaction(async (tx) => {
        const veiculo = await tx.veiculo.findUnique({ where: { id: veiculoId } });
        
        if (!veiculo || !veiculo.disponibilidade) {
            throw new Error("Veículo indisponível ou inexistente");
        }

        const milissegundos = prevista - inicio;
        const dias = Math.ceil(milissegundos / (1000 * 60 * 60 * 24));
        const valor_total = dias * veiculo.valor_diaria;

        const locacao = await tx.locacao.create({
            data: {
                usuarioId,
                veiculoId,
                data_inicio: inicio,
                data_prevista: prevista,
                valor_total
            }
        });

        await tx.veiculo.update({
            where: { id: veiculoId },
            data: { disponibilidade: false }
        });

        return locacao;
    });
};

const listarHistorico = async (usuarioId) => {
    return await prisma.locacao.findMany({
        where: { usuarioId },
        include: { veiculo: true },
        orderBy: { data_inicio: 'desc' }
    });
};

const finalizarLocacao = async (usuarioId, locacaoId) => {
    return await prisma.$transaction(async (tx) => {
        const locacao = await tx.locacao.findUnique({ where: { id: locacaoId } });

        if (!locacao || locacao.usuarioId !== usuarioId) {
            throw new Error("Locação não encontrada ou acesso não autorizado");
        }

        if (locacao.status === "FINALIZADA") {
            throw new Error("Esta locação já foi finalizada");
        }

        const locacaoFinalizada = await tx.locacao.update({
            where: { id: locacaoId },
            data: {
                status: "FINALIZADA",
                data_efetiva: new Date()
            }
        });

        await tx.veiculo.update({
            where: { id: locacao.veiculoId },
            data: { disponibilidade: true }
        });

        return locacaoFinalizada;
    });
};

module.exports = { registrarLocacao, listarHistorico, finalizarLocacao };