const VeiculoService = require('../services/VeiculoService');

const cadastrar = async (req, res) => {
    try {
        const veiculo = await VeiculoService.cadastrar(req.body);
        res.status(201).json(veiculo);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const listar = async (req, res) => {
    try {
        const veiculos = await VeiculoService.listar();
        res.status(200).json(veiculos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const listarDisponiveis = async (req, res) => {
    try {
        const veiculos = await VeiculoService.listarDisponiveis();
        res.status(200).json(veiculos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { cadastrar, listar, listarDisponiveis };