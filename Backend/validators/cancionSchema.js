const Joi = require('joi');
const cancionSchema = Joi.object({
    nombre: Joi.string().min(1).max(100).required(),
    idAlbum: Joi.number().min(0).optional(),
    // urlCancion: Joi.file().min(0).required(),
    // urlImagen: Joi.file().min(1).max(100).optional(),
});

module.exports = {
    cancionSchema,    
};