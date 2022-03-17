const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");

app.use(cors());
app.options("*", cors());

//Midleware
app.use(express.json());
app.use(morgan("tiny"));

//Routes
const categoriesRoutes = require("./routers/categories");
const productsRoutes = require("./routers/products");
const usersRoutes = require("./routers/users");
const ordersRoutes = require("./routers/orders");

const api = process.env.API_URL;

app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/products`, productsRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/orders`, ordersRoutes);

//Connection with mongodb
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

//Server
app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});