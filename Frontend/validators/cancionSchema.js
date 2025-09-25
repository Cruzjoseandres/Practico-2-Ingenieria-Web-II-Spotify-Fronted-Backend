const Joi = require('joi');
const cancionSchema = Joi.object({
    nombre: Joi.string().min(1).max(100).required(),
    idAlbum: Joi.number().min(0).required(),
    
});

module.exports = {
    cancionSchema,    
};