import { DataTypes } from "sequelize";

import { primaryKey, stringNotNull, options, dateNow } from "../dbProperty.js";

import { sq } from "../../config/db.js";

const User = sq.define(
  "users",
  {
    user_id: primaryKey(),
    name: stringNotNull(50),
    email: { ...stringNotNull(50), unique: true },
    password: stringNotNull(),
    confirm_password: stringNotNull(),
    creation_date: dateNow(),
    last_modified_date: dateNow(),
  },
  options()
);

export default User;
