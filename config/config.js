const { Pool } = require("pg");

const chaveSecretaJWT =
  "3718d26195ae34d69a565d4aad975cf76271c61d6670eef5699949bb4f571126";

const bdPostgres = new Pool({
  user: "postgres",
  host: "localhost",
  database: "crud_node",
  password: "postgres",
  port: 5432,
});

module.exports = { chaveSecretaJWT, bdPostgres };
