const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const routerUsuario = require("./routes/api/usuario/api");
const routerPesquisa = require("./routes/api/pesquisa/api");

app.use(
  cors({
    origin: "http://localhost:4200",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(bodyParser.json());
app.use("/usuario", routerUsuario);
app.use("/pesquisas", routerPesquisa);

app.listen(3000, () => {
  console.log("API started on port 3000");
});
