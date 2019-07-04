const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Genre = sequelize.define(
    "Genre",
    {
      genre_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: false
      }
    },
    {}
  );
  Genre.associate = function(models) {
    // Associations
    Genre.hasMany(models.Artist_Genres, { foreignKey: "genre_id" });
  };
  return Genre;
};
