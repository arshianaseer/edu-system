import { DataTypes } from "sequelize";

import {
  primaryKey,
  foreignKey,
  stringNotNull,
  options,
  dateNow,
  intNotNull,
} from "../dbProperty.js";

import { sq } from "../../config/db.js";

const Courses = sq.define(
  "courses",
  {
    course_id: primaryKey(),
    user_id: foreignKey({ references: { model: "users", key: "user_id" } }),
    course_name: stringNotNull(50),
    instructor_name: stringNotNull(50),
    description: stringNotNull(300),
    semester: intNotNull(50),
    creation_date: dateNow(),
    last_modified_date: dateNow(),
  },
  options()
);

export default Courses;
