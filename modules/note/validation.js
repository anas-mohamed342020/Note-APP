const Joi = require("joi");

const noteValidation = {
  body: Joi.object().required().keys({
    title: Joi.string().required(),
    content: Joi.string().required(),
  }),
};

const updatenoteValidation = {
  body: Joi.object()
    .required()
    .keys({
      title: Joi.string().required(),
      content: Joi.string().required(),
      id: Joi.string().required().max(24).min(24),
    }),
};
const idValidation = {
  body: Joi.object()
    .required()
    .keys({
      id: Joi.string().required().max(24).min(24),
    }),
};
const nodata = {
    body: Joi.object()
    .required()
    .keys({
      
    }),

};

module.exports = { noteValidation, updatenoteValidation, idValidation, nodata };
