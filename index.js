// * import express & body parser dependenies
const express = require("express")
const bodyParser = require("body-parser")

// * create server with express
const server = express();

// * routing files:
const postRouter = require('./Routers/post_router')

// * support JSON encoded bodies:
// * support encoded bodies:

// * adding server supports:
// * JSON encoded bodies 
// * post routing 
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(postRouter)

// * server listens on port 8080 locally
server.listen(8080, () => {
    console.log('server started on port 8080')
})