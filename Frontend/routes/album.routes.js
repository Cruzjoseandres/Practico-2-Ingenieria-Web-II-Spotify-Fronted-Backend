const getObjectOr404 = require('../middlewares/getObjectOr404.middleware');
const isJsonRequestValid = require('../middlewares/isJsonRequestValid.middleware');
const validationJson = require('../middlewares/validation.middleware');
const checkDuplicate = require('../middlewares/checkDuplicate.middleware');
const { albumSchema } = require('../validators/albumSchema');

const db = require('../models');

module.exports = app => {
	const router = require('express').Router();
	const albumController = require('../controllers/album.controller');

	router.get('/', albumController.getAllAlbum);
	router.post('/',isJsonRequestValid,validationJson(albumSchema),checkDuplicate(db.album, 'nombre'), albumController.createAlbum);
	router.get('/:id/album', albumController.getAlbumById);
	router.put('/:id/update',isJsonRequestValid,validationJson(albumSchema), getObjectOr404(db.album), albumController.updateAlbum);
	router.delete('/:id', getObjectOr404(db.album), albumController.deleteAlbum);

	router.get('/:id/artistas', albumController.getAlbumsbyArtist);

	app.use('/albums', router);
};
