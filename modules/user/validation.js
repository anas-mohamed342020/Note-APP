const Joi = require('joi')

const signUpSchema = {

    body: Joi.object().required().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().required()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        cPassword: Joi.ref('password'),

    })
}
const signInSchema = {

    body: Joi.object().required().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    })
}
const token = {

    params: Joi.object().required().keys({
        token: Joi.string().required()
    }) 
}

const updateScheme = {
    body: Joi.object().required().keys({
        name: Joi.string().required()
    })
}
const deactivate = {
    body: Joi.object().required().keys({
        id: Joi.string().required().max(24).min(24)
    })

}

const sendACode = {
    body: Joi.object().required().keys({
        email: Joi.string().required().email()
    })

}
const changePassword = {
    body: Joi.object().required().keys({
        email: Joi.string().required().email(),

        aCode: Joi.string().required().length(6),

        nPassword: Joi.string().required()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        cnPassword: Joi.ref('nPassword'),
    }),


}

module.exports = { signUpSchema, signInSchema, token, updateScheme, deactivate,sendACode,changePassword }