const sequelize = require('../config/database');

// Importar os modelos
const Usuarios = require('./Usuarios');
const Funcionarios = require('./Funcionarios');
const Compras = require('./Compras');

// Inicializar os modelos
const models = {
  Usuarios: Usuarios(sequelize, sequelize.Sequelize.DataTypes),
  Funcionarios: Funcionarios(sequelize, sequelize.Sequelize.DataTypes),
  Compras: Compras(sequelize, sequelize.Sequelize.DataTypes),
};

// Configurar as associações
Object.values(models).forEach((model) => {
  if (model.associate) {
    model.associate(models);
  }
});

module.exports = { sequelize, ...models };
