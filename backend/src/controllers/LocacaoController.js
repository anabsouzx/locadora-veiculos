const LocacaoService = require('../services/LocacaoService');

const registrar = async (req, res) => {
    try {
        const usuarioId = req.usuario.id;
        const { veiculoId, data_inicio, data_prevista } = req.body;
        const locacao = await LocacaoService.registrarLocacao(usuarioId, veiculoId, data_inicio, data_prevista);
        res.status(201).json(locacao);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const listarHistorico = async (req, res) => {
    try {
        const usuarioId = req.usuario.id;
        const locacoes = await LocacaoService.listarHistorico(usuarioId);
        res.status(200).json(locacoes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const finalizar = async (req, res) => {
    try {
        const usuarioId = req.usuario.id;
        const locacaoId = parseInt(req.params.id);
        const locacao = await LocacaoService.finalizarLocacao(usuarioId, locacaoId);
        res.status(200).json(locacao);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { registrar, listarHistorico, finalizar };