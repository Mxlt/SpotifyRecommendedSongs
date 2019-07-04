const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id_user: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      user_spotify_id: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      username: {
        type: Sequelize.STRING(45),
        allowNull: false
      },
      birthdate: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      email: {
        type: Sequelize.STRING(45),
        allowNull: false
      },
      country: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      accessToken: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      refreshToken: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      expires_in: {
        type: Sequelize.INTEGER,
        allowNull: true
      }
    },
    {}
  );

  User.associate = function(models) {
    // Association
    User.hasMany(models.Connection, { foreignKey: "id_user" });
    User.hasMany(models.User_Song, { foreignKey: "id_user" });
  };
  return User;
};
