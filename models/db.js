import { sq } from "../config/db.js";
import { DataTypes } from "sequelize";
import Assignments from "./entity/assignment.js";
import User from "./entity/users.js";
import Courses from "./entity/course.js";
import Grades from "./entity/grade.js";

// sq.User;
User.hasMany(Courses, { foreignKey: "user_id" });
Courses.belongsTo(User, { foreignKey: "user_id" });

Courses.hasMany(Assignments, { foreignKey: "course_id" });
Assignments.belongsTo(Courses, { foreignKey: "course_id" });

User.hasMany(Assignments, { foreignKey: "user_id" });
Assignments.belongsTo(User, { foreignKey: "user_id" });

User.hasMany(Grades, { foreignKey: "user_id" });
Grades.belongsTo(User, { foreignKey: "user_id" });

Courses.hasMany(Grades, { foreignKey: "course_id" });
Grades.belongsTo(Courses, { foreignKey: "course_id" });

async function creerTable() {
  sq.sync()
    // sq.sync({ force: true })
    .then(() => {
      console.log("Tables created");
    })
    .catch((err) => {
      console.error(err);
    });
}

export default creerTable;
