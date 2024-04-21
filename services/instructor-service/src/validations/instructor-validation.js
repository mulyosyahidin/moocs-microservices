import Joi from "joi";

const registerInstructorValidation = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    phone_number: Joi.string().required(),
    summary: Joi.string().required(),
});

const updateInstructorValidation = Joi.object({
    name: Joi.string().optional(),
    email: Joi.string().email().optional(),
    password: Joi.string().min(8).optional(),
    phone_number: Joi.string().optional(),
    summary: Joi.string().optional(),
    bank_name: Joi.string().optional(),
    account_number: Joi.string().optional(),
    account_name: Joi.string().optional(),
});

export {
    registerInstructorValidation,
    updateInstructorValidation,
}