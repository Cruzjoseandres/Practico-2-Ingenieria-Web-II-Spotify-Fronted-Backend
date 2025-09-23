const { DataTypes } = require('sequelize');

module.exports = function (sequelize) {
    const Cancion = sequelize.define('Cancion', {
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        idAlbum: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    });
    return Cancion;
}
