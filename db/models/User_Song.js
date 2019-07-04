const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const User_Song = sequelize.define(
    "User_Song",
    {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      played_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    },
    {}
  );
  User_Song.associate = function(models) {
    // Associations

    User_Song.belongsTo(models.Song, {
      foreignKey: "song_spotify_id"
    });
    User_Song.belongsTo(models.User, { foreignKey: "id_user" });
  };
  return User_Song;
};
