// * import express & body parser dependenies
const express = require("express")
// const nanoid = require("nanoid/non-secure")
const bodyParser = require("body-parser")

// * importing database file to server 
const database = require("./data/db")

// * create server with express
const server = express();

// * support JSON encoded bodies
server.use(bodyParser.json());

// * support encoded bodies
server.use(bodyParser.urlencoded({ extended: true })); 