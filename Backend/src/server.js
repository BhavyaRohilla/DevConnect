const dotenv = require("dotenv");
const http = require("http");

// Load env vars before anything else
dotenv.config();

const app = require("./app");
const connectDB = require("./config/database");
const intialiseSocket = require("./utils/socket");

// Create server AFTER app is loaded
const server = http.createServer(app);

// Connect to database
connectDB();
intialiseSocket(server);

const port = process.env.PORT || 5000;
server.listen(port, (err) => {
  if (err) {
    console.error("❌ Error starting server:", err);
    process.exit(1);
  }
  console.log(
    `🚀 Server is successfully listening on port ${port} in ${
      process.env.NODE_ENV || "development"
    } mode`
  );
});
