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
  const idGenero = req.params.id;
  try {
    const artistasGenero = await db.artistaGenero.findAll({
      where: { idGenero },
      include: [{ model: db.artista, as: 'artista' }]
    });
    const artistas = artistasGenero.map(ag => ag.artista);
    res.json(artistas);
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
  try {
    const result = await db.artistaGenero.destroy({ where: { idArtista, idGenero } });
    if (result === 0) {
      return res.status(404).json({ error: 'Relacion artista-genero no encontrada' });
    }
    res.json({ message: 'Relacion artista-genero eliminada' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar relacion artista-genero' });
  }

}


exports.addArtistasToGenero = async (req, res) => {
  console.log('BODY:', req.body);
  console.log('PARAMS:', req.params);

  const idGenero = req.params.idGenero;
  let { idArtistas } = req.body;



  if (!idGenero) {
    return res.status(400).json({ error: "ID de género no proporcionado" });
  }

  if (!idArtistas) {
    return res.status(400).json({ error: "No se proporcionaron artistas" });
  }

  if (!Array.isArray(idArtistas)) {
    idArtistas = [idArtistas];
  }

  try {

    const registros = idArtistas.map(idArtista => ({
      idArtista,
      idGenero,
    }));

    await db.artistaGenero.bulkCreate(registros);

    const genero = await db.genero.findByPk(idGenero);

    const artistas = await db.artista.findAll({
      where: { id: idArtistas }
    });

    res.json({
      genero,
      artistas
    });
  } catch (error) {
    console.error("Error al añadir artistas al género:", error);
    res.status(500).json({ error: "Error al añadir artistas al género" });
  }
};

exports.getArtistasNoRelacionadosByGeneroId = async (req, res) => {
  const idGenero = req.params.idGenero;
  try {

    const todosArtistas = await db.artista.findAll();


    const relaciones = await db.artistaGenero.findAll({
      where: { idGenero },
      attributes: ['idArtista']
    });
    const relacionadosIds = relaciones.map(rel => rel.idArtista);


    const artistasNoRelacionados = todosArtistas.filter(
      artista => !relacionadosIds.includes(artista.id)
    );

    res.json(artistasNoRelacionados);
  } catch (error) {
    console.error("Error al obtener artistas no relacionados:", error);
    res.status(500).json({ error: "Error al obtener artistas no relacionados con el género" });
  }
};


