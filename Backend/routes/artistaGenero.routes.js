const getObjectOr404 = require('../middlewares/getObjectOr404.middleware');
const isJsonRequestValid = require('../middlewares/isJsonRequestValid.middleware');
const validationJson = require('../middlewares/validation.middleware');
const { artistaGeneroSchema } = require('../validators/artistaGeneroSchema');

const db = require('../models');

module.exports = app => {
	const router = require('express').Router();
	const artistaGeneroController = require('../controllers/artistaGenero.controller');

	router.get('/', artistaGeneroController.getAllArtistasWithGeneros);
	router.get('/:id/artistasConGeneros', artistaGeneroController.getArtistasWithGenerosById);
	router.post('/',isJsonRequestValid,validationJson(artistaGeneroSchema), artistaGeneroController.createAlbum);
	router.get('/:id', getObjectOr404(db.album), artistaGeneroController.getAlbumById);
	router.put('/:id',validationJson,validationJson(artistaGeneroSchema), getObjectOr404(db.album), artistaGeneroController.updateAlbum);
	router.delete('/:id', getObjectOr404(db.album), artistaGeneroController.deleteAlbum);

	app.use('/albums', router);
};
