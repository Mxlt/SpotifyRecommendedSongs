const Sequelize = require("sequelize");
("use strict");
module.exports = (sequelize, DataTypes) => {
  const Artist_Songs = sequelize.define(
    "Artist_Songs",
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
  Artist_Songs.associate = function(models) {
    Artist_Songs.belongsTo(models.Artist, {
      foreignKey: "artist_spotify_id"
    });
    Artist_Songs.belongsTo(models.Song, { foreignKey: "song_spotify_id" });
  };
  return Artist_Songs;
};
