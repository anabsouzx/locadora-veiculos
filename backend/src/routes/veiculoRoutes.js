const express = require('express');
const VeiculoController = require('../controllers/VeiculoController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(authMiddleware);

router.post('/', VeiculoController.cadastrar);
router.get('/', VeiculoController.listar);
router.get('/disponiveis', VeiculoController.listarDisponiveis);

module.exports = router;