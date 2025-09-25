const { generoSchema } = require('../validators/generoSchema');

const getObjectOr404 = require('../middlewares/getObjectOr404.middleware');
const isJsonRequestValid = require('../middlewares/isJsonRequestValid.middleware');
const validationJson = require('../middlewares/validation.middleware');
const checkDuplicate = require('../middlewares/checkDuplicate.middleware');

const db = require('../models');

module.exports = app => {
    const router = require('express').Router();
    const generoController = require('../controllers/genero.controller');


    router.get('/', generoController.getAllGeneros);
    router.post('/', isJsonRequestValid, validationJson(generoSchema),checkDuplicate(db.genero,'nombre'), generoController.createGenero);
    router.get('/:id/genero', getObjectOr404(db.genero), generoController.getGeneroById);
    router.put('/:id/update', isJsonRequestValid, validationJson(generoSchema), getObjectOr404(db.genero), generoController.updateGenero);
    router.delete('/:id/delete', getObjectOr404(db.genero), generoController.deleteGenero);

    app.use('/generos', router);
};
