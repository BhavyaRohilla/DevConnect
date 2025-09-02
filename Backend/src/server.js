const dotenv = require("dotenv");

// Load env vars before anything else
dotenv.config();

const app = require("./app");
const connectDB = require("./config/database");

// Connect to database
connectDB();

const port = process.env.PORT || 5000;

app.listen(port, (err) => {
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
