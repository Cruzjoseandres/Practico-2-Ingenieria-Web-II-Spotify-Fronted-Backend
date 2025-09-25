const { DataTypes } = require('sequelize');

module.exports = function (sequelize) {
    const ArtistaGenero = sequelize.define('ArtistaGenero', {
        idGenero: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        idArtista: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    });

    return ArtistaGenero;
}
