const express = require("express");
const route = express.Router();
const controladorMateria = require("../controladores/controladorMateria");

route.get ("/",                     controladorMateria.mostrar);
route.post("/agregar",              controladorMateria.agregar);
route.get("/eliminar/:ClaveMateria",          controladorMateria.eliminar);
//route.get("/editar/:Matricula",            controladorAlumno.editar);
route.post("/editar",               controladorMateria.editar);
route.post("/modificar/:ClaveMateria",        controladorMateria.modificar);

module.exports = route;