// models/Funcionarios.js
module.exports = (sequelize, DataTypes) => {
  const Funcionarios = sequelize.define('Funcionario', {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cargo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    salario: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
  });

  return Funcionarios;
};
