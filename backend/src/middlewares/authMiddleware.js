const { verifyToken } = require('../utils/jwt');

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: "Token ausente" });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = verifyToken(token);
        req.usuario = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ error: "Token inválido" });
    }
};

module.exports = authMiddleware;