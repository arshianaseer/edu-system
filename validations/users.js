import { check, validationResult } from "express-validator";
import User from "../models/entity/users.js";

export const LoginValidations = [
  check("email").isEmail().withMessage("Invalid email address"),

  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .bail()
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),

  (req, res, next) => {
    const error = validationResult(req);
    const errorsArr = [];
    if (!error.isEmpty()) {
      let errors = Object.values(error.mapped());
      errors.forEach((item) => {
        errorsArr.push(item.msg);
      });
      console.log(errorsArr);
    }
    if (errorsArr.length > 0) {
      res.render("login.ejs", { errorsArr });
    }
    next();
  },
];

export const validateUser = [
  check("name").notEmpty().withMessage("Last name is required"),
  check("email")
    .isEmail()
    .withMessage("Invalid email address")
    .bail()
    .custom(async (value) => {
      // Check if the email is already in use
      const user = await User.findOne({ where: { email: value } });
      if (user) {
        throw new Error("Email is already in use");
      }
      return true;
    }),
  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .bail()
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters")
    .bail()
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
    .withMessage("Password must contain at least one letter and one number"),

  check("confirm_password")
    .notEmpty()
    .withMessage("Confirm password is required")
    .bail()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),

  (req, res, next) => {
    const error = validationResult(req);
    let errorsArr = [];
    if (!error.isEmpty()) {
      let errors = Object.values(error.mapped());
      errors.forEach((item) => {
        errorsArr.push(item.msg);
      });
      console.log(errorsArr);
    }

    if (errorsArr.length > 0) {
      res.render("register.ejs", { errorsArr });
    }
    next();
  },
];
