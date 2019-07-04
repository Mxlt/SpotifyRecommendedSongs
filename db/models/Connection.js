const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Connection = sequelize.define(
    "Connection",
    {
      id_connection: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      date: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      browser_version: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      user_agent: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      ip: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      country: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      city: {
        type: Sequelize.STRING(255),
        allowNull: false
      }
    },
    {}
  );
  Connection.associate = function(models) {
    // Associations
    Connection.belongsTo(models.User, { foreignKey: "id_user" });
  };
  return Connection;
};
