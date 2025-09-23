const { DataTypes } = require('sequelize');

module.exports = function (sequelize) {
    const AlbumGenero = sequelize.define('AlbumGenero', {
        idGenero: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        idArtista: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    });

    return AlbumGenero;
}
