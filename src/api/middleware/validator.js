import { body } from "express-validator";

const validateRegister = [
    body("username")
        .trim()
        .escape()
        .notEmpty()
        .withMessage("Username is required")
        .isLength({ min: 3 })
        .withMessage("Username must be at least 3 characters"),

    body("email").trim().escape().isEmail().withMessage("Invalid email"),

    body("password")
        .escape()
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters"),
];

export {validateRegister};