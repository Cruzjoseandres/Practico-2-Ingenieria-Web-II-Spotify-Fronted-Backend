const { sequelize } = require("../config/db.config");

const artista = require('./Artista.models')(sequelize);
const album = require('./Album.models')(sequelize);
const cancion = require('./Cancion.models')(sequelize);
const genero = require('./Genero.models')(sequelize);
const artistaGenero = require('./ArtistaGenero.models')(sequelize);


// Asociaciones música
// Artista 1 - N Album
album.belongsTo(artista, { foreignKey: 'ArtistaId', as: 'artista' });
artista.hasMany(album, { foreignKey: 'ArtistaId', as: 'albums' });

// Album 1 - N Cancion
cancion.belongsTo(album, { foreignKey: 'AlbumId', as: 'album' });
album.hasMany(cancion, { foreignKey: 'AlbumId', as: 'canciones' });

// Artista 1 - N Cancion 
cancion.belongsTo(artista, { foreignKey: 'ArtistaId', as: 'artista' });
artista.hasMany(cancion, { foreignKey: 'ArtistaId', as: 'canciones' });

// Artista N - N Genero
artista.belongsToMany(genero, { through: artistaGenero, as: 'generos', foreignKey: 'ArtistaId' });
genero.belongsToMany(artista, { through: artistaGenero, as: 'artistas', foreignKey: 'GeneroId' });

module.exports = {
    artista,
    album,
    cancion,
    genero,
    artistaGenero,
    sequelize,
    Sequelize: sequelize.Sequelize
}