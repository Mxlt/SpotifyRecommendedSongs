const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Artist = sequelize.define(
    "Artist",
    {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      artist_spotify_id: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      name: {
        type: Sequelize.STRING(45),
        allowNull: false
      }
    },
    {}
  );
  Artist.associate = function(models) {
    // Associations
    Artist.hasMany(models.Artist_Songs, { foreignKey: "artist_spotify_id" });
    Artist.hasMany(models.Artist_Genres, { foreignKey: "artist_spotify_id" });
  };
  return Artist;
};
