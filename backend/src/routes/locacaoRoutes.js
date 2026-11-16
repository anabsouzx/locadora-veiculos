const express = require('express');
const LocacaoController = require('../controllers/LocacaoController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(authMiddleware);

router.post('/', LocacaoController.registrar);
router.get('/', LocacaoController.listarHistorico);
router.patch('/:id/finalizar', LocacaoController.finalizar);

module.exports = router;