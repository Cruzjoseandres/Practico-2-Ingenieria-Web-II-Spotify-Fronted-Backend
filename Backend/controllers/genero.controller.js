const db = require('../models');

exports.getAllGeneros = async (req, res) => {
    const generos = await db.genero.findAll();
    res.json(generos);
}

exports.getGeneroById = async (req, res) => {
    res.json(req.obj);
}

exports.createGenero = async (req, res) => {
    const { nombre } = req.body;
    try {
        const genero = await db.genero.create({ nombre });
        res.status(201).json(genero);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear genero' });
    }
}

exports.updateGenero = async (req, res) => {
    try {
        const genero = req.obj;
        const { nombre } = req.body;
        if (nombre) genero.nombre = nombre;
        await genero.save();
        res.json(genero);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar genero' });
    }
}

exports.deleteGenero = async (req, res) => {
    try {
        const genero = req.obj;
        await genero.destroy();
        res.json({ message: 'Genero eliminado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar genero' });
    }
}
