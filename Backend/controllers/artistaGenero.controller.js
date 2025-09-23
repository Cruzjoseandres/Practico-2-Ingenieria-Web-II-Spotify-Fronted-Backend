const db = require('../models');
exports.getAllArtistasWithGeneros = async (req, res) => {
    const artistas = await db.artista.findAll({
        include: { model: db.genero, through: { attributes: [] } }
    });
    res.json(artistas);
}

exports.getGenerosByArtistaId = async (req, res) => {
    const artista = req.obj;
    try {
        const generosArtista = await db.artistaGenero.findAll({
            where: { idArtista: artista.id },
            include: { model: db.genero }
        });
        res.json(generosArtista);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener generos del artista' });
    }
}

exports.getArtistasByGeneroId = async (req, res) => {
    const genero = req.obj;
    try {
        const artistasGenero = await db.artistaGenero.findAll({
            where: { idGenero: genero.id },
            include: { model: db.artista }
        });
        res.json(artistasGenero);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener artistas del genero' });
    }
}


exports.createArtistaGenero = async (req, res) => {
    const { idGenero } = req.params;
    const { idArtista } = req.body;
    try {
        const artistaGenero = await db.artistaGenero.create({ idArtista, idGenero });
        res.status(201).json(artistaGenero);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear relacion artista-genero' });
    }
}

exports.deleteArtistaGenero = async (req, res) => {
    const { idGenero } = req.params;
    const { idArtista } = req.body;
    try{
        const result = await db.artistaGenero.destroy({ where: { idArtista, idGenero } });
        if (result === 0) {
            return res.status(404).json({ error: 'Relacion artista-genero no encontrada' });
        }
        res.json({ message: 'Relacion artista-genero eliminada' });
    }catch(error){
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar relacion artista-genero' });
    }

}

