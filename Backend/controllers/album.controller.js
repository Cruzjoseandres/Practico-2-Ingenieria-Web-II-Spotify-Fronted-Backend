const db = require('../models');
/* global __dirname */
exports.getAllAlbum = async (req, res) => {
    const album = await db.album.findAll();
    res.json(album);
}

exports.getAlbumById = async (req, res) => {
    res.json(req.obj);
}

exports.createAlbum = async (req, res) => {
    const { nombre, idArtista } = req.body;
    const { imagenAlbum } = req.files;
    try {
        const album = await db.album.create({ nombre, idArtista });

        if (imagenAlbum) {
            const uploadedFile = __dirname + '/../public/ImagenesAlbum/' + album.id + '.jpg';
            await album.mv(uploadedFile);
            await db.artista.update({ url: album.id + '.jpg' }, { where: { id: album.id } });
        }

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
            const uploadedFile = __dirname + '/../public/ImagenesArtista/' + album.id + '.jpg';
            await imagenAlbum.mv(uploadedFile);
            await db.artista.update({ url: album.id + '.jpg' }, { where: { id: album.id } });
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
