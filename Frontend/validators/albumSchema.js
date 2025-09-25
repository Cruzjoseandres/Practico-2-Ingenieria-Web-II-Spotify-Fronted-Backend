const Joi = require('joi');
const albumSchema = Joi.object({
    nombre: Joi.string().min(1).max(100).required(),
    idArtista: Joi.number().integer().required(),
});

module.exports = {
    albumSchema,    
};