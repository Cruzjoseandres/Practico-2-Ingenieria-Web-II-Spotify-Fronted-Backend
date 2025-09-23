const db = require('../models');
/* global __dirname */
exports.getAllArtistas = async (req, res) => {
    const artistas = await db.artista.findAll();
    res.json(artistas);
}

exports.getArtistaById = async (req, res) => {
    res.json(req.obj);
}

exports.createArtista = async (req, res) => {
    const { nombre } = req.body;
    const { imagenArtista } = req.files;
    try {
        const artista = await db.artista.create({ nombre });

        if (imagenArtista) {
            const uploadedFile = __dirname + '/../public/ImagenesArtista/' + artista.id + '.jpg';
            await imagenArtista.mv(uploadedFile);
            await db.artista.update({ url: artista.id + '.jpg' }, { where: { id: artista.id } });
        }

        res.status(201).json(artista);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear artista' });
    }
}

exports.updateArtista = async (req, res) => {
    try {
        const artista = req.obj;
        const { nombre } = req.body;
        const { imagenArtista } = req.files || {};

        if (nombre) artista.nombre = nombre;
        if (imagenArtista) {
            const uploadedFile = __dirname + '/../public/ImagenesArtista/' + artista.id + '.jpg';
            await imagenArtista.mv(uploadedFile);
            await db.artista.update({ url: artista.id + '.jpg' }, { where: { id: artista.id } });
        }

        await artista.save();
        res.json(artista);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar artista' });
    }
}

exports.deleteArtista = async (req, res) => {
    try {
        const artista = req.obj;
        await artista.destroy();
        res.json({ message: 'Artista eliminado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar artista' });
    }
}
