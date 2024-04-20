import Joi from "joi";

const storeCategoryValidation = Joi.object({
    name: Joi.string().required(),
    parent_id: Joi.number().optional(),
});

export {
    storeCategoryValidation,
}