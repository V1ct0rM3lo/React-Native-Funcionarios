const express = require('express');
const authService = require('../services/authService');
const router = express.Router();

router.post('/cadastrar', async (req, res) => {
    const { nome, email, senha, nivel } = req.body;
    if (!email || !senha) {
        return res.status(400).json({ message: 'Informe os dados de acesso!' });
    }

    try {
        await authService.registrar(nome, email, senha, nivel);
        res.status(201).json({ message: 'Usuário criado com sucesso!' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar o usuário!' });
    }
});

router.post('/login', async (req, res) => {
    const { email, senha } = req.body;

    try {
        const token = await authService.login(email, senha);
        res.json({ token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;

