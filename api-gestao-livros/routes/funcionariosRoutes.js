const express = require('express');
const funcionariosService = require('../services/funcionariosService');
const authenticateToken = require('../middleware/auth');
const router = express.Router();

router.post('/novo', authenticateToken, async (req, res) => {
    const { nome, cargo, salario } = req.body;

    try {
        const funcionario = await funcionariosService.novoFuncionario(nome, cargo, salario);
        res.status(201).json(funcionario);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar o funcionário!' });
    }
});

router.get('/', authenticateToken, async (req, res) => {
    try {
        const funcionarios = await funcionariosService.getFuncionarios();
        res.json(funcionarios);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao retornar os registros dos funcionários!' });
    }
});

router.get('/editar/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    try {
        const funcionario = await funcionariosService.getFuncionario(id);
        res.json(funcionario);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao retornar o registro do funcionário!' });
    }
});

router.put('/editar/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    const { nome, cargo, salario } = req.body;

    try {
        const funcionario = await funcionariosService.alterarFuncionario(id, nome, cargo, salario);
        res.json(funcionario);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/excluir/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;

    try {
        await funcionariosService.excluirFuncionario(id);
        res.json({ message: 'Funcionário excluído com sucesso!' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
