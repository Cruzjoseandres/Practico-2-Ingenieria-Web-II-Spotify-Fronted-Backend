const getObjectOr404 = require('../middlewares/getObjectOr404.middleware');
const isJsonRequestValid = require('../middlewares/isJsonRequestValid.middleware');
const validationJson = require('../middlewares/validation.middleware');
const { albumSchema } = require('../validators/albumSchema');

const db = require('../models');

module.exports = app => {
	const router = require('express').Router();
	const albumController = require('../controllers/album.controller');

	router.get('/', albumController.getAllAlbums);
	router.post('/',isJsonRequestValid,validationJson(albumSchema), albumController.createAlbum);
	router.get('/:id', getObjectOr404(db.album), albumController.getAlbumById);
	router.put('/:id',validationJson,validationJson(albumSchema), getObjectOr404(db.album), albumController.updateAlbum);
	router.delete('/:id', getObjectOr404(db.album), albumController.deleteAlbum);

	app.use('/albums', router);
};
