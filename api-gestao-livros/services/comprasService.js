// services/funcionariosService.js
const { Funcionarios, Livros } = require('../models');

const funcionariosService = {

    async novoFuncionario(nome, cargo) {
        const funcionario = await Funcionarios.create({
            nome,
            cargo,
            dataContratacao: new Date(),
        });

        return funcionario;
    },

    async getFuncionarios() {
        return await Funcionarios.findAll();
    },

    async getFuncionario(id) {
        const funcionario = await Funcionarios.findByPk(id);
        if (!funcionario) {
            throw new Error('Funcionário não encontrado');
        }
        return funcionario;
    },

    async alterarFuncionario(id, nome, cargo) {
        const funcionario = await Funcionarios.findByPk(id);
        if (!funcionario) {
            throw new Error('Funcionário não encontrado');
        }

        funcionario.nome = nome;
        funcionario.cargo = cargo;
        await funcionario.save();

        return funcionario;
    },

    async excluirFuncionario(id) {
        const funcionario = await Funcionarios.findByPk(id);
        if (!funcionario) {
            throw new Error('Funcionário não encontrado');
        }

        await funcionario.destroy();
    }

};

module.exports = funcionariosService;
