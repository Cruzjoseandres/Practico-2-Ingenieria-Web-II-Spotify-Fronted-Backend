const Joi = require('joi');


const artistasToGeneroSchema = Joi.object({
  idArtistas: Joi.alternatives().try(
    Joi.array().items(Joi.number().integer().required()).min(1),
    Joi.number().integer().required()
  ).required()
});

module.exports = {

    artistasToGeneroSchema
};