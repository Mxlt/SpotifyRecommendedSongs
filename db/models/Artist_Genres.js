const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Artist_Genres = sequelize.define(
    "Artist_Genres",
    {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      }
    },
    {}
  );
  Artist_Genres.associate = function(models) {
    // Associations

    Artist_Genres.belongsTo(models.Artist, {
      foreignKey: "artist_spotify_id"
    });
    Artist_Genres.belongsTo(models.Genre, { foreignKey: "genre_id" });
  };
  return Artist_Genres;
};
