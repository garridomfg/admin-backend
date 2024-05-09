require("dotenv").config();

const express = require("express");
const cors = require("cors");

const { dbConnection } = require("./db/config");

const app = express();

// Middlewares
// CORS config
app.use(cors());

// Public folder
app.use(express.static("public"));

// Read and parse JSON
app.use(express.json());

// DB connection
dbConnection();

// Routes
app.use("/api/users", require("./routes/users.routes"));
app.use("/api/login", require("./routes/auth.routes"));
app.use("/api/hospitals", require("./routes/hospitals.routes"));
app.use("/api/doctors", require("./routes/doctors.routes"));
app.use("/api/all", require("./routes/search.routes"));
app.use("/api/upload", require("./routes/upload.routes"));

// Server up
app.listen(process.env.PORT, () => {
  console.log("Server up in port:", process.env.PORT);
});
