const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const veiculoRoutes = require('./routes/veiculoRoutes');
const locacaoRoutes = require('./routes/locacaoRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/veiculos', veiculoRoutes);
app.use('/locacoes', locacaoRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Erro interno no servidor' });
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Servidor rodando na porta", process.env.PORT || 3000);
});