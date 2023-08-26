const express = require("express");
const route = express.Router();
const controladorAlumno = require("../controladores/controladorAlumno");

route.get ("/",                     controladorAlumno.mostrar);
route.post("/agregar",              controladorAlumno.agregar);
route.get("/eliminar/:Matricula",          controladorAlumno.eliminar);
//route.get("/editar/:Matricula",            controladorAlumno.editar);
route.post("/editar",               controladorAlumno.editar);
route.post("/modificar/:Matricula",        controladorAlumno.modificar);

module.exports = route;