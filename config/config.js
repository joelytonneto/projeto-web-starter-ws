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
  process.env.DB_PASSWORD, { host: process.env.DB_HOST, port: process.env.DB_PORT, dialect: 'postgres' }
);

async function conectarBancoDeDados() {
  try {
    await conexaoSequelize.authenticate();
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
    await conexaoSequelize.sync();
    console.log('Todas as tabelas foram sincronizadas com sucesso.');
  } catch (error) {
    console.error('Erro ao conectar e sincronizar o banco de dados:', error);
  }
}

module.exports = { chaveSecretaJWT, bdPostgres, conexaoSequelize, conectarBancoDeDados };
