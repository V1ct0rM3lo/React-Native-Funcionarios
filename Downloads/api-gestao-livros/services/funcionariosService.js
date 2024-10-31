const { Funcionarios } = require('../models');

const funcionariosService = {
    async novoFuncionario(nome, cargo, salario) {
        return Funcionarios.create({ nome, cargo, salario });
    },

    async getFuncionarios() {
        return Funcionarios.findAll();
    },

    async getFuncionario(id) {
        const funcionario = await Funcionarios.findByPk(id);
        if (!funcionario) 
            throw new Error('Funcionário não encontrado');
        else 
            return funcionario;
    },

    async alterarFuncionario(id, nome, cargo, salario) {
        const funcionario = await Funcionarios.findByPk(id);
        if (!funcionario) throw new Error('Funcionário não encontrado');
        funcionario.nome = nome;
        funcionario.cargo = cargo;
        funcionario.salario = salario;
        return funcionario.save();
    },

    async excluirFuncionario(id) {
        const funcionario = await Funcionarios.findByPk(id);
        if (!funcionario) throw new Error('Funcionário não encontrado');
        return funcionario.destroy();
    }
    
};

module.exports = funcionariosService;
