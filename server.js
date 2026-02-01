require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db");

const port = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(port, () => console.log("Server running on port:http://localhost:5001"));
  })
  .catch((e) => {
    console.log("DB connection error:", e.message);
  });