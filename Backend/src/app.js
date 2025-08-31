const express = require("express");

const app = express();

app.use("/test", (req, res) => {
  res.end("Hello from the server");
});

app.listen(8000, () => {
  console.log("Server is successfully listening on port 8000...");
});
