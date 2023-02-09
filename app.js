const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const routerUsuario = require("./routes/api/usuario/api");

app.use(
  cors({
    origin: "http://localhost:4200",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(bodyParser.json());
app.use("/usuario", routerUsuario);

app.listen(3000, () => {
  console.log("API started on port 3000");
});
