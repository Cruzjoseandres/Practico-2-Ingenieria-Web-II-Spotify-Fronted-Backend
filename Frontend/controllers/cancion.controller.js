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
    const  urlCancion   = req.files?.urlCancion ?? null;
    const urlImagen = req.files?.urlImagen ?? null;

    if(!urlImagen){
        return res.status(400).json({ error: 'La imagen de la cancion es obligatoria' });
    }
    if(!urlCancion){
        return res.status(400).json({ error: 'El archivo de la cancion es obligatorio' });
    }
    try {
        const cancion = await db.cancion.create({
            nombre,
            idAlbum
        });

            const audioPath = __dirname + '/../public/AudioCanciones/' + cancion.id + '.mp3';
            await urlCancion.mv(audioPath);
            await db.cancion.update({ url: cancion.id + '.mp3' }, { where: { id: cancion.id } });
        
            const imagePath = __dirname + '/../public/ImagenesCanciones/' + cancion.id + '.jpg';
            await urlImagen.mv(imagePath);
            await db.cancion.update({ url: cancion.id + '.jpg' }, { where: { id: cancion.id } });
        

        res.status(201).json(cancion);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.createCancionSinAlbum = async (req,res) => {
    const { nombre } = req.body;
    const  urlCancion   = req.files?.urlCancion ?? null;
    const urlImagen = req.files?.urlImagen ?? null;
    if(!urlImagen){
        return res.status(400).json({ error: 'La imagen de la cancion es obligatoria' });
    }
    if(!urlCancion){
        return res.status(400).json({ error: 'El archivo de la cancion es obligatorio' });
    }
    try {
        const cancion = await db.cancion.create({
            nombre
        });
            const audioPath = __dirname + '/../public/AudioCanciones/' + cancion.id + '.mp3';
            await urlCancion.mv(audioPath);
            await db.cancion.update({ url: cancion.id + '.mp3' }, { where: { id: cancion.id } });
            const imagePath = __dirname + '/../public/ImagenesCanciones/' + cancion.id + '.jpg';
            await urlImagen.mv(imagePath);
            await db.cancion.update({ url: cancion.id + '.jpg' }, { where: { id: cancion.id } });
        res.status(201).json(cancion);
     } catch (error) {
        res.status(500).json({ error: error.message });
    }

}

exports.updateCancion = async (req, res) => {
    try {
        const cancion = req.obj;
        const { nombre, idAlbum } = req.body;
        const { urlCancion, urlImagen } = req.files || {};

        if (nombre) cancion.nombre = nombre;
        if (idAlbum) cancion.idAlbum = idAlbum;

        
        if (urlCancion) {
            const uploadedFile = __dirname + '/../public/canciones/' + cancion.id +  + '.mp3';
            await urlCancion.mv(uploadedFile);
        }

        
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

exports.getCancionesByAlbumId = async (req,res) =>{
    const { id } = req.params;
    if(!id){
        return res.status(404).json({ error: 'El id del album es obligatorio' });
    }
    try{
        
    const canciones = await db.cancion.findAll(
        { where: { idAlbum: id } }
    );
    res.json(canciones);

    }catch(error){
        console.error(error);
        res.status(500).json({error: 'Error al obtener las canciones del album' });
    }

}
