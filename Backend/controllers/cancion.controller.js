const db = require('../models');
/* global __dirname */

exports.getAllCanciones = async (req, res) => {
    const canciones = await db.cancion.findAll();
    res.json(canciones);
}

exports.getCancionById = async (req, res) => {
    res.json(req.obj);
}

exports.createCancion = async (req, res) => {
    const { nombre, idAlbum } = req.body;
    const { urlCancion, urlImagen } = req.files;

    try {
        const cancion = await db.cancion.create({
            nombre,
            idAlbum
        });

        if (urlCancion) {
            const uploadedFile = __dirname + '/../public/canciones/' + cancion.id + '.mp3';
            await urlCancion.mv(uploadedFile);
            await db.cancion.update({ url: cancion.id + '.mp3' }, { where: { id: cancion.id } });
        }
        if (urlImagen) {
            const uploadedFile = __dirname + '/../public/ImagenesCanciones/' + cancion.id + '.jpg';
            await urlImagen.mv(uploadedFile);
            await db.cancion.update({ url: cancion.id + '.jpg' }, { where: { id: cancion.id } });
        }

        res.status(201).json(cancion);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateCancion = async (req, res) => {
    try {
        const cancion = req.obj;
        const { nombre, idAlbum } = req.body;
        const { urlCancion, urlImagen } = req.files || {};

        if (nombre) cancion.nombre = nombre;
        if (idAlbum) cancion.idAlbum = idAlbum;

        // Actualizar archivo de audio si se envía uno nuevo
        if (urlCancion) {
            const uploadedFile = __dirname + '/../public/canciones/' + cancion.id + '.mp3';
            await urlCancion.mv(uploadedFile);
        }

        // Actualizar imagen si se envía una nueva
        if (urlImagen) {
            const uploadedFile = __dirname + '/../public/ImagenesCanciones/' + cancion.id + '.jpg';
            await urlImagen.mv(uploadedFile);
        }

        await cancion.save();
        res.json(cancion);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar canción' });
    }
};

exports.deleteCancion = async (req, res) => {
    try {
        const cancion = req.obj;
        await cancion.destroy();
        res.json({ message: 'Cancion eliminada' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar cancion' });
    }
}
