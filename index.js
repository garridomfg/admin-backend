require("dotenv").config();

const express = require("express");
const cors = require('cors')

const { dbConnection } = require("./db/config");

const app = express();
app.use(cors())

dbConnection();

app.get("/", (req, resp) => {
  resp.json({
    ok: true,
    msg: "Hola mundo",
  });
});

app.listen(process.env.PORT, () => {
  console.log("Server up in port:", process.env.PORT);
});
