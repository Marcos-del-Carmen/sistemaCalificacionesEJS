const express = require("express");
const route = express.Router();
const controladorSesion = require("../controladores/controladorSesion");

route.post("/iniciar", controladorSesion.iniciar);
route.post("/cerrar", controladorSesion.cerrar);

module.exports = route;