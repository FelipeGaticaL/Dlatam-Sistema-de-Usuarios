/* 
CREATE DATABASE softlife;
CREATE TABLE usuarios (email varchar( 25 ), password varchar( 25 ));
*/

const express = require('express');
const db = require('./bd');
const fs = require("fs");
const app = express();

// middlwares
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
})

app.post("/usuario", async (req, res) => {
    console.log(req.body)
    try {

        const respuesta = await db.agregarUsuario(req.body);
        res.send(respuesta).status(201);
    } catch (error) {
        res.status(500).send(error)
    }
})
app.get("/usuarios", async (req, res) => {
    try {
        console.log("asdfadsf")
        const resultado = await db.getUsuarios();
        res.end(JSON.stringify(resultado))
    } catch (error) {
        res.status(500).send(error)
    }
})
app.post("/login", async (req, res) => {
  
    try {

        const respuesta = await db.loginUsuarios(req.body);
        res.send(respuesta).status(201);
    } catch (error) {
        res.status(500).send(error)
    }
})





app.listen(3000, () => {
    console.log("Server on http://localhost:3000");
});