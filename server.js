import http from "http";
import app from "./app.js";

// Function to normalize port
const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

// Set the port to use for the server
const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

// Error handler function for server
const errorHandler = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === "string" ? "pipe " + address : "port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges.");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use.");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

// Create HTTP server using Express app
const server = http.createServer(app);

// Handle server errors
server.on("error", errorHandler);

// Start listening on specified port
server.on("listening", () => {
  const address = server.address();
  const bind = typeof address === "string" ? "pipe " + address : "port " + port;
  console.log("Listening on " + bind);
});

// Start the server
server.listen(port, "localhost");
// server.listen(port, "192.168.100.180");
