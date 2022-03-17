const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");

require("dotenv/config");
const api = process.env.API_URL;

//Midleware
app.use(express.json());
app.use(morgan("tiny"));

const productSchema = mongoose.Schema({
    name: String,
    image: String,
    countInStock: {
        type: Number,
        required: true,
    },
});

const Product = mongoose.model("Product", productSchema);

app.get(`${api}/products`, async(req, res) => {
    const productList = await Product.find();

    if (!productList) {
        res.status(500).json({ sucess: false });
    }

    res.send(productList);
});

app.post(`${api}/products`, (req, res) => {
    const product = new Product({
        name: req.body.name,
        image: req.body.image,
        countInStock: req.body.countInStock,
    });

    product
        .save()
        .then((createdProduct) => {
            res.status(201).json(createdProduct);
        })
        .catch((err) => {
            res.status(500).json({
                error: err,
                sucess: false,
            });
        });
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
    console.log("Servidor rodando em http://localhost:3000");
});