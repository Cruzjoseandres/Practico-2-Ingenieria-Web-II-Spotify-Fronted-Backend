const getObjectOr404 = require('../middlewares/getObjectOr404.middleware');
const isJsonRequestValid = require('../middlewares/isJsonRequestValid.middleware');
const validationJson = require('../middlewares/validation.middleware');
const checkDuplicate = require('../middlewares/checkDuplicate.middleware');
const { artistaSchema } = require('../validators/artistaSchema');

const db = require('../models');

module.exports = app => {

    const router = require('express').Router();
    const artistaController = require('../controllers/artista.controller');

    router.get('/', artistaController.getAllArtistas);
    router.post('/',isJsonRequestValid,validationJson(artistaSchema),checkDuplicate(db.artista, 'nombre'), artistaController.createArtista);
    router.get('/:id/artista', getObjectOr404(db.artista), artistaController.getArtistaById);
    router.put('/:id/update',isJsonRequestValid,validationJson(artistaSchema), getObjectOr404(db.artista), artistaController.updateArtista);
    router.delete('/:id/delete', getObjectOr404(db.artista), artistaController.deleteArtista);

    app.use('/artistas', router);

};