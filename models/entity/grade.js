import { DataTypes } from "sequelize";

import {
  primaryKey,
  foreignKey,
  stringNotNull,
  options,
  dateNow,
  dateNotNull,
  intNotNull,
} from "../dbProperty.js";

import { sq } from "../../config/db.js";

const Grades = sq.define(
  "grades",
  {
    id: primaryKey(),
    user_id: foreignKey({ references: { model: "users", key: "user_id" } }),
    course_id: foreignKey({
      references: { model: "courses", key: "course_id" },
    }),
    mids: intNotNull(50),
    finals: intNotNull(50),
    assignments: intNotNull(50),
    quizes: intNotNull(50),
    others: intNotNull(50),
    creation_date: dateNow(),
    last_modified_date: dateNow(),
  },
  options()
);

export default Grades;
