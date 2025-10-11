const joi =require("joi");

module.exports.studentSchema=joi.object({
    student:joi.object({
        registration_no:joi.string().required(),
        name:joi.string().required(),
        father_name:joi.string().required(),
        mother_name:joi.string().required(),
        fees:joi.number().required(),
        image:joi.string().required(),
        course:joi.string().required(),
        semester:joi.number().required().min(1).max(8),
        email:joi.string().required(),
        college:joi.string().required(),
        university:joi.string().required(),
        address:joi.string().required()
    }).required()
})

module.exports.staffSchema=joi.object({
    staff:joi.object({
        name:joi.string().required(),
        father_name:joi.string().required(),
        department:joi.string().required(),
        phone_no:joi.number().required(),
        image:joi.string().required(),
        salary:joi.number().required(),
        address:joi.string().required(),
        email:joi.string().required()
    })
})