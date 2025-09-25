const db = require('../models');
/* global __dirname */
exports.getAllAlbum = async (req, res) => {
    const album = await db.album.findAll({
        include: [{ model: db.artista, as: 'artista' }]
    });
    res.json(album);
}

exports.getAlbumById = async (req, res) => {
    const id = req.params.id;
    try {
        const album = await db.album.findByPk(id, {
            include: [{ model: db.artista, as: 'artista', attributes: ['id', 'nombre'] }]
        });
        if (!album) return res.status(404).json({ error: 'Álbum no encontrado' });
        res.json(album);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener álbum' });
    }
}

exports.createAlbum = async (req, res) => {
    const { nombre, idArtista } = req.body;
    const imagenAlbum = req.files?.imagenAlbum ?? null;

    if (!imagenAlbum) {
        return res.status(400).json({ error: 'La imagen del album es obligatoria' });
    }

    try {
        const album = await db.album.create({ nombre, idArtista });
        const uploadedFile = __dirname + '/../public/ImagenesAlbums/' + album.id + '.jpg';
        await imagenAlbum.mv(uploadedFile);
        await db.album.update({ url: album.id + '.jpg' }, { where: { id: album.id } });
        res.status(201).json(album);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear album' });
    }
}

exports.updateAlbum = async (req, res) => {
    try {
        const album = req.obj;
        const { nombre, idArtista } = req.body;
        const { imagenAlbum } = req.files || {};

        if (nombre) album.nombre = nombre;
        if (idArtista) album.idArtista = idArtista;
        if (imagenAlbum) {
            const uploadedFile = __dirname + '/../public/ImagenesAlbums/' + album.id + '.jpg';
            await imagenAlbum.mv(uploadedFile);
            await db.album.update({ url: album.id + '.jpg' }, { where: { id: album.id } });
        }

        await album.save();
        res.json(album);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar album' });
    }
}

exports.deleteAlbum = async (req, res) => {
    try {
        const album = req.obj;
        await album.destroy();
        res.json({ message: 'Album eliminado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar album' });
    }
}


exports.getAlbumsbyArtist = async (req, res) => {
    const { id } = req.params;
    try {
        const albums = await db.album.findAll({ where: { idArtista: id } });
        res.json(albums);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener albums del artista' });
    }
}