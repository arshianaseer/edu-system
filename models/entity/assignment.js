import { DataTypes } from "sequelize";

import {
  primaryKey,
  foreignKey,
  stringNotNull,
  options,
  dateNow,
  dateNotNull,
} from "../dbProperty.js";

import { sq } from "../../config/db.js";

const Assignments = sq.define(
  "assignments",
  {
    id: primaryKey(),
    user_id: foreignKey({ references: { model: "users", key: "user_id" } }),
    course_id: foreignKey({
      references: { model: "courses", key: "course_id" },
    }),
    name: stringNotNull(50),
    due_date: dateNotNull(),
    description: stringNotNull(300),
    creation_date: dateNow(),
    last_modified_date: dateNow(),
  },
  options()
);

export default Assignments;
