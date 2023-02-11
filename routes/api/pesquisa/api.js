const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://127.0.0.1:27018';
const routerPesquisa = express();

routerPesquisa.use(express.json());

routerPesquisa.post('/pesquisa', (req, res) => {
  const pesquisa = req.body;

  MongoClient.connect(url, {
    serverSelectionTimeoutMS: 5000
  })
  .then((client) => {
    const db = client.db('teste');
    const collection = db.collection('teste');

    collection.insertOne(pesquisa)
    .then((result) => {
      res.send(result);
      client.close();
    }).
    catch((err) => {
      console.error(err);
      return res.status(500).send(err);
    });
  })
  .catch((err) => {
    console.error(err);
    return res.status(500).send(err);
  });
});

module.exports = routerPesquisa;