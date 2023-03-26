require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require('cors');
const app = express();
app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
}));

app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({
    extended: true // {a: {b : k, c : d}}, for nested populated
}));
// export app.js
module.exports = app;