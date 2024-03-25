import express from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { testDbConnection } from "./config/db.js";
import creerTable from "./models/db.js";
import route_sync from "./controllers/router/routes.js";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import session from "express-session";
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

testDbConnection();
creerTable();
const app = express();
// setting the templating engine for express
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
  session({
    secret: "educational-system",
    saveUninitialized: true,
    resave: true,
    cookie: { maxAge: 900000 }, //here ,15 min session time
  })
);

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Express API for educational-system",
    version: "1.0.0",
    description:
      "This is a REST API application made with Express. it's a test for swaggger",
    license: {
      name: "Licensed Under MIT",
      url: "https://spdx.org/licenses/MIT.html",
    },
    contact: {
      name: "educational-system",
      url: "",
    },
  },
  servers: [
    {
      url: "http://localhot",
      description: "LocaL server",
    },
  ],
};

// const options = {
//   swaggerDefinition,
//   apis: ["./swagger.yaml"],
// };

// const swaggerspec = swaggerJSDoc(options);

// app.use(
//   "/api-docs",
//   swaggerUi.serve,
//   swaggerUi.setup(swaggerDocument, options)
// );
app.use("/", route_sync);
export default app;
