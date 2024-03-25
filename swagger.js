import swaggerAutogen from "swagger-autogen";
const doc = {
  info: {
    title: "educational-system",
    description: "educational-system",
  },
  host: "localhost",
};

const outputFile = "./swagger-output.json";
const route = ["./controllers/router/routes.js"];
swaggerAutogen(outputFile, route, doc);
