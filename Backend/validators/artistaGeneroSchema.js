const Joi = require('joi');
const artistaGeneroSchema = Joi.object({
    idGenero: Joi.number().integer().required(),
    idArtista: Joi.number().integer().required(),
});

module.exports = {
    artistaGeneroSchema,    
};