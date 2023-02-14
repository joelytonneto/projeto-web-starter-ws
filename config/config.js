require('dotenv').config();
const { Pool } = require("pg");
const Sequelize = require('sequelize');

const chaveSecretaJWT = process.env.JWT_SECRET_KEY;

const bdPostgres = new Pool({
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const conexaoSequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD, { host: process.env.DB_HOST, dialect: 'postgres' }
);

module.exports = { chaveSecretaJWT, bdPostgres, conexaoSequelize };
