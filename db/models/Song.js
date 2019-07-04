const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Song = sequelize.define(
    "Song",
    {
      id_song: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      song_spotify_id: {
        type: Sequelize.STRING(255),
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      album: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      popularity: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      track_number: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      time_signature: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      acousticness: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      danceability: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      energy: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      instrumentalness: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      loudness: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      valence: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      uri: {
        type: Sequelize.STRING(255),
        allowNull: true
      }
    },
    {}
  );
  Song.associate = function(models) {
    // Associations
    Song.hasMany(models.Artist_Songs, { foreignKey: "song_spotify_id" });
    Song.hasMany(models.User_Song, { foreignKey: "song_spotify_id" });
  };
  return Song;
};
