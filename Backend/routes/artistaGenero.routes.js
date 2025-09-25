const getObjectOr404 = require('../middlewares/getObjectOr404.middleware');
const isJsonRequestValid = require('../middlewares/isJsonRequestValid.middleware');
const validationJson = require('../middlewares/validation.middleware');
const { artistaGeneroSchema } = require('../validators/artistaGeneroSchema');

const db = require('../models');

module.exports = app => {
	const router = require('express').Router();
	const artistaGeneroController = require('../controllers/artistaGenero.controller');

	router.get('/', artistaGeneroController.getAllArtistasWithGeneros);
	router.get('/:id/artistasConGeneros', artistaGeneroController.getArtistasByGeneroId);
	router.post('/',isJsonRequestValid,validationJson(artistaGeneroSchema), artistaGeneroController.createArtistaGenero);
	router.delete('/:id', getObjectOr404(db.album), artistaGeneroController.deleteArtistaGenero);

	app.use('/albums', router);
};
