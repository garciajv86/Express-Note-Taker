const express = require("express");

const port = process.env.PORT || 3001;

const app = express();

//TODO: Set up middleware that is needed
//* Middleware to parse incoming request bodies in JSON format to a Javascript object.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));
