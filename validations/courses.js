import { check, validationResult } from "express-validator";
import User from "../models/entity/users.js";

export const CoursesValidations = [
  check("course_name").notEmpty().withMessage("Course name is required"),
  check("instructor_name")
    .notEmpty()
    .withMessage("Instructor name is required"),
  check("description").notEmpty().withMessage("Description is required"),
  check("semester").isInt({ min: 1 }).withMessage("Invalid semester"),

  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorsArr = errors.array().map((error) => error.msg);
      console.log(errorsArr);
      const isclass = "courses";
      const user_id = req.userId;
      try {
        const userData = await User.findOne({
          where: {
            user_id: user_id,
          },
        });
        return res.render("addcourses.ejs", {
          errorsArr,
          userData,
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
