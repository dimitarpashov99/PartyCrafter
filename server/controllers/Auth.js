const { body } = require("express-validator");
const catchAsync = require("../utils/catchAsync");
const authService = require("../services/authentication");
const invitationService = require("../services/invitations");
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
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
        };
        const result = await authService.register(data);
        res.json(result);
    }),
];

const login = [
    // body("email")
    //     .isLength({ min: 1 })
    //     .trim()
    //     .withMessage("Email must be specified.")
    //     .isEmail()
    //     .withMessage("Email must be a valid email address."),
    // body("password").isEmpty().withMessage("Password must be provided"),
    handleValidation,
    catchAsync(async (req, res) => {
        const { email, password } = req.body;
        const userData = await authService.login(email, password);
        const userInvitations = await invitationService.getInvitations({
            guestEmail: userData.profile.email,
        });
        if (userInvitations && userInvitations.length) {
            userData.invitations = userInvitations;
        }
        res.json(userData);
    }),
];

const changePassword = [
    handleValidation,
    catchAsync(async (req, res) => {
        const { oldPassword, newPassword } = req.body;
        const user = req.currentUser.id;

        const result = await authService.changePassword(
            user,
            oldPassword,
            newPassword
        );
        res.json(result);
    }),
];
module.exports = { register, login, changePassword };
