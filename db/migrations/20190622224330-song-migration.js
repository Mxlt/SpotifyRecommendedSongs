"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Songs", {
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
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Songs");
  }
};
