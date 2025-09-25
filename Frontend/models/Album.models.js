const { DataTypes } = require('sequelize');

module.exports = function (sequelize) {
    const Album = sequelize.define('Album', {
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        idArtista: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    });

    return Album;
}
