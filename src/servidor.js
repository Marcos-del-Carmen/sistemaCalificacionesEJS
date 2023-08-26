const express = require("express"); // Servidor web
const ejs = require("ejs"); // Motor de plantillas
const path = require("path"); // Manejar rutas
const mysql = require("mysql"); // Driver de la BD
const myConnection = require("express-myconnection");
const session = require("express-session");
const rutas = require('./rutas/index.js');

const servidor = express();

// Configuración de la conexión a la base de datos
const dbOptions = {
  host: "localhost",
  user: "root",
  password: "12345",
  port: 3306,
  database: "dwi_final_marcos_francisco"
};

// Configuraciones (settings)
servidor.set("puerto", 3001);
servidor.set("view engine", "ejs"); // EJS es el motor de plantillas
servidor.set("views", path.join(__dirname, "vistas"));

servidor.engine("html", ejs.renderFile); // Preprocesa las vistas HTML como EJS

// Herramientas intermedias (middlewares)
servidor.use(express.urlencoded({ extended: false }));
servidor.use(express.json());
servidor.use(myConnection(mysql, dbOptions, "single"));

servidor.use(
  session({
    secret: "estaEsUnaClaveSecreta_nodeJS",
    resave: false,
    saveUninitialized: true
  })
);

// Variable global para todas las páginas
// servidor.use((req, res, next) => {
//   servidor.locals.usuario = { user: "root" };
//   next();
// });

// Rutas
servidor.use("/", require("./rutas/index.js")); // Rutas (index)
servidor.use("/alumnos", require("./rutas/alumnos.js")); // Rutas (alumnos)
servidor.use("/materias", require("./rutas/materias.js")); // Rutas (materias)

servidor.use("/sesion", require("./rutas/sesion.js")); // Rutas (sesion)
servidor.use(express.static(path.join(__dirname, "publico"))); // Archivos estáticos

// Servidor escuchando (listening server)
servidor.listen(servidor.get("puerto"), () => {
  console.log("Servidor escuchando por el puerto:", servidor.get("puerto"));
});

// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '12345',
//   database: 'db_alumnos'
// });

// // Comprobación de la conexión a la base de datos
// connection.connect((err) => {
//   if (err) {
//     console.error('Error al conectar a la base de datos:', err.message);
//   } else {
//     console.log('Conexión exitosa a la base de datos.');
//     connection.end(); // Cierra la conexión después de realizar la consulta
//     // });
//   }
// });