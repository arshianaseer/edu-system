import { Sequelize } from "sequelize";

const sequelize = new Sequelize("educational-system", "root", "arshia", {
  host: "localhost",
  dialect: "mysql",
});

console.log("12");

const testDbConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
console.log("log");
export { sequelize as sq, testDbConnection };
