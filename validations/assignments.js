import { check, validationResult } from "express-validator";
import User from "../models/entity/users.js";
import Courses from "../models/entity/course.js";
import { sq } from "../config/db.js";

export const AssignmentsValidations = [
  check("name").notEmpty().withMessage("Assignment name is required"),
  check("due_date").notEmpty().withMessage("Due date is required"),
  check("description").notEmpty().withMessage("Description is required"),
  check("course_id")
    .isInt({ min: 1 })
    .withMessage("Invalid course_id")
    .bail()
    .custom(async (value) => {
      const task = await sq.models.courses.findOne({
        where: { course_id: value },
      });

      if (!task) {
        throw new Error("Course does not exist");
      }
      return true;
    }),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorsArr = errors.array().map((error) => error.msg);
      console.log(errorsArr);
      const isclass = "assignments";
      const user_id = req.userId;
      try {
        const userData = await User.findOne({
          where: {
            user_id: user_id,
          },
        });
        const courses = await Courses.findAll({
          where: { user_id: req.userId },
        });
        return res.render("addassignments.ejs", {
          errorsArr,
          userData,
          courses,
          isclass,
        });
      } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
      }
    }
    next();
  },
];
