const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");

//Midleware
app.use(express.json());
app.use(morgan("tiny"));

require("dotenv/config");

const api = process.env.API_URL;

app.get(`${api}/products`, (req, res) => {
    const product = {
        id: "1",
        name: "hair dresser",
        image: "some_url",
    };
    res.send(product);
});

app.post(`${api}/products`, (req, res) => {
    const newProduct = req.body;
    console.log(newProduct);
    res.send(newProduct);
});

mongoose
    .connect(process.env.CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: "eshop-database",
    })
    .then(() => {
        console.log("Conexão com o Banco de Dados pronta...");
    })
    .catch((err) => {
        console.log(err);
    });

app.listen(3000, () => {
    console.log(api);
    console.log("Servidor rodando em http://localhost:3000");
});