const { check } = require('express-validator')

const checkValidation = [
    check('email').not().isEmpty().withMessage('email is required').isEmail().withMessage("invalid email format"),
    check('name').not().isEmpty().withMessage('name is required').isLength({ min: 3 }).withMessage("too short name").isLength({max: 16}).withMessage("too long name"),
    check('age').not().isEmpty().withMessage('age is required').isInt({ min: 17 }).withMessage('too young')
];

module.exports = {
    checkValidation
}