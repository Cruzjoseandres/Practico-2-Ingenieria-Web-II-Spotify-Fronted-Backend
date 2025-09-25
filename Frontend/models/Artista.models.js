const { DataTypes } = require('sequelize');

module.exports = function (sequelize) {
    const Artista = sequelize.define('Artista', {
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    return Artista;
}
