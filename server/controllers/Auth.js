const { body, validationResult } = require("express-validator");
const catchAsync = require("../utils/catchAsync");

const authService = require("../services/authentication");
const handleValidation = require("../middlewares/handleValidation");
const register = [
    body("firstName")
        .isLength({ min: 1 })
        .trim()
        .withMessage("First name must be specified.")
        .isAlphanumeric()
        .withMessage("First name has non-alphanumeric characters."),
    body("lastName")
        .isLength({ min: 1 })
        .trim()
        .withMessage("Last name must be specified.")
        .isAlphanumeric()
        .withMessage("Last name has non-alphanumeric characters."),
    body("email")
        .isLength({ min: 1 })
        .trim()
        .withMessage("Email must be specified.")
        .isEmail()
        .withMessage("Email must be a valid email address."),
    body("password")
        .isLength({ min: 6 })
        .trim()
        .withMessage("Password must be 6 characters or greater."),
    handleValidation,
    catchAsync(async (req, res) => {
        const data = {
            firstName: req.body.firstname,
            lastName: req.body.lastname,
            email: req.body.email,
            password: req.body.email,
        };
        const result = await authService.register(data);
        res.json(result);
    }),
];

const login = [
    body("email")
        .not()
        .isEmpty()
        .trim()
        .withMessage("Request must contain email."),
    body("password")
        .not()
        .isEmpty()
        .trim()
        .withMessage("Request must contain password."),
    handleValidation,
    catchAsync(async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }
        const { email, password } = req.body;
        const result = await authService.login(email, password);
        res.json(result);
    }),
];

module.exports = { register, login };
