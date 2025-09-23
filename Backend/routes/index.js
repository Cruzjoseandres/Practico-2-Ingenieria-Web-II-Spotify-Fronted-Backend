module.exports = app => {

    require('./artista.routes')(app);
    require('./cancion.routes')(app);
    require('./genero.routes')(app);
};