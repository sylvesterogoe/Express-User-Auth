import Joi from '@hapi/joi';

const registerValidation = (data) => {
    const schema = {
        name: Joi.string().min(6).required(),
        email: Joi.string().email().required(),
        password: Joi.string().password(),
    };
    return Joi.validate(data, schema);
};

const loginValidation = (data) => {
    const schema = {
        name: Joi.string().min(6).required(),
        password: Joi.string().password()
    };
    return Joi.validate(data, schema);
};

export { registerValidation, loginValidation };