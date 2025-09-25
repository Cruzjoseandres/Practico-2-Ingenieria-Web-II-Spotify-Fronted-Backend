const getObjectOr404 = require('../middlewares/getObjectOr404.middleware');
const isJsonRequestValid = require('../middlewares/isJsonRequestValid.middleware');
const validationJson = require('../middlewares/validation.middleware');
const { artistasToGeneroSchema } = require('../validators/artistaGeneroSchema');

const db = require('../models');

module.exports = app => {
	const router = require('express').Router();
	const artistaGeneroController = require('../controllers/artistaGenero.controller');

	router.get('/', artistaGeneroController.getAllArtistasWithGeneros);
	router.get('/:id/artistasConGeneros', artistaGeneroController.getArtistasByGeneroId);

	router.get('/generos/:idGenero/artistas-disponibles', artistaGeneroController.getArtistasNoRelacionadosByGeneroId);

	router.post('/', isJsonRequestValid, validationJson(artistasToGeneroSchema), artistaGeneroController.createArtistaGenero);


	router.post('/generos/:idGenero/artistas', isJsonRequestValid, validationJson(artistasToGeneroSchema), artistaGeneroController.addArtistasToGenero);
	router.delete('/:id', getObjectOr404(db.album), artistaGeneroController.deleteArtistaGenero);

	app.use('/artistasGenero', router);
};
