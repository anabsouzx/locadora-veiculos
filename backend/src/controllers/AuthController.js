const AuthService = require('../services/AuthService');

const register = async (req, res) => {
    try {
        const usuario = await AuthService.register(req.body);
        res.status(201).json(usuario);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, senha } = req.body;
        const token = await AuthService.login(email, senha);
        res.status(200).json(token);
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};

module.exports = { register, login };