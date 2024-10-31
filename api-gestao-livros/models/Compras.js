// models/Funcionarios.js
module.exports = (sequelize, DataTypes) => {
  const Funcionarios = sequelize.define('Compras', {
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
      dataContratacao: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
      },
  });

  Funcionarios.associate = (models) => {
      // Aqui você pode definir associações com outros modelos, se necessário
  };

  return Funcionarios;
};
