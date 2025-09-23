const getObjectOr404 = require('../middlewares/getObjectOr404.middleware');
const isJsonRequestValid = require('../middlewares/isJsonRequestValid.middleware');
const validationJson = require('../middlewares/validation.middleware');

const cancionSchema = require('../validators/cancionSchema');




const db = require('../models');
module.exports = app => {
    const router = require('express').Router();
    const cancionController = require('../controllers/cancion.controller');

    router.get('/', cancionController.getAllCanciones);
    router.post('/', isJsonRequestValid,validationJson(cancionSchema),cancionController.createCancion);
    router.get('/:id/cancion', getObjectOr404(db.cancion), cancionController.getCancionById);
    router.put('/:id/update',isJsonRequestValid,validationJson(cancionSchema),getObjectOr404(db.cancion), cancionController.updateCancion);
    router.delete('/:id/delete', getObjectOr404(db.cancion), cancionController.deleteCancion);

    app.use('/canciones', router);
};
