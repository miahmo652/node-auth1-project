const express = require("express");
const users = require("./users/users_router")
const session = require("express-session")
const KnexSessionStore = require("connect-session-knex")(session)
const db = require("./data/config")
const server = express();
server.use(express.json());
server.use(
    session({
        resave: false, //avoids recreating sessions that have not changed
        saveUninitialized: false, // comply with GDPR laws
        secret: "keep it secret, keep it safe",
       store: new KnexSessionStore({
         knex: db,
         createtable: true,
       }),
    })
);

server.use("/api", users);

server.get("/", (req, res) => {
    res.status(200).json({ message: "WELCOME " });
  });
  
  module.exports = server;