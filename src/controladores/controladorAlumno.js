const moment = require("moment");


const controlador = {};

/*controlador.mostrar = (req, res) => {
// req.getConnection((err, conn) => {

    if (err) throw err;
    conn.query("SELECT * FROM alumnos", (error, resultados) => {
      if (error) {
        res.json(error);
      }
      // console.log("Los resultados son: ", resultados);
      const usuario = req.session.usuario;
      if (usuario) {
        // console.log("Los resultados sonn: ", resultados);
        res.render("alumno.ejs", { data: resultados, usuario });
      }
      else
        res.redirect("/");
    });
  });
};
*/
controlador.mostrar = (req, res) => {
  req.getConnection((err, conn) => {
    if (err) throw err;
    conn.query("SELECT * FROM alumnos", (error, resultados) => {
      if (error) {
        res.json(error);
      }

      // Formatear las fechas antes de enviarlas a la vista
      for (const fila of resultados) {
        fila.FechaNac = moment(fila.FechaNac).format('DD-MM-YYYY'); // Formatear la fecha
      }

      const usuario = req.session.usuario;
      if (usuario) {
        res.render("alumno.ejs", {
          data: resultados,
          usuario
        });
      } else {
        res.redirect("/");
      }
    });
  });
};
controlador.editar = (req, res) => {
  // const (NL) req.params;
  const Matricula = req.body.tfMatricula;
  var datos;
  var fila;
  req.getConnection((err, conn) => {
    conn.query("SELECT * FROM alumnos", [], (error, resultados) => {
      datos = resultados;

      for (const fila of resultados) {
        fila.FechaNac = moment(fila.FechaNac).format('DD-MM-YYYY'); // Formatear la fecha
      }
    });

    conn.query("SELECT * FROM alumnos WHERE Matricula = ?", [Matricula], (error, row) => {
      console.log("datos", datos);
      console.log("fila", row);
      res.render("alumnos_editar.ejs", {
        data: datos,
        fila: row
      })
    })
  });
};

controlador.agregar = (req, res) => {
  const reg = {
    Matricula: req.body.tfMatricula,
    Nombre:      req.body.tfNombre,
    Paterno:     req.body.tfPaterno,
    Materno:     req.body.tfMaterno,
    Sexo:        req.body.tfSexo,
    FechaNac:    req.body.tfFechaNac,
    Telefono:    req.body.tfTelefono,
    Direccion:   req.body.tfDireccion,
    Correo:      req.body.tfCorreo,
  };

  req.getConnection((err, conn) => {
    if (err) throw err;

    console.log(reg);
    conn.query("INSERT INTO alumnos SET ?", [reg], (error, resultados) => {
      if (error) {
        // En lugar de enviar una respuesta JSON en caso de error, puedes redirigir con un mensaje en la URL
        res.redirect("/alumnos?error=" + encodeURIComponent(error.message));
      } else {
        // Si no hay errores, redirige al cliente a la página de alumnos
        res.redirect("/alumnos");
      }
    });
  });
};



controlador.editar = (req,res) => {
  const Matricula = req.body.tfMatricula;
  
  req.getConnection((err, conn) => {
    if (err) throw err;
     
    conn.query("SELECT * FROM alumnos WHERE Matricula = ?", [Matricula], (error, resultados) => {
    
      if (error) {
        // Manejo del error si ocurre un problema en la consulta
        console.error(error);
        return res.status(500).send("Error al obtener los datos de la alumno.");
      }

      if (resultados.length === 0) {
        // Manejo si no se encuentra una materia con esa clave
        return res.status(404).send("almno no encontrada.");
      }

      const fila = resultados[0]; // Tomamos el primer resultado como la fila a editar
      res.render('alumnos_editar', { fila, data: resultados }); // Pasamos la fila y los datos a la vista
    });
  });
};

controlador.modificar = (req, res) => {
  const { Matricula } = req.params;
  const reg = {
    Matricula: parseInt(req.body.tfMatricula, 10),
    Nombre: req.body.tfNombre,
    Paterno: req.body.tfPaterno,
    Materno: req.body.tfMaterno,
    Sexo: req.body.tfSexo,
    FechaNac: req.body.tfFechaNac,
    Telefono: req.body.tfTelefono,
    Direccion:req.body.tfDireccion,
    Correo:req.body.tfCorreo,
  };

  req.getConnection((err, conn) => {
    conn.query("UPDATE alumnos SET ? WHERE Matricula=?", [reg, Matricula], (error, resultados) => {
      res.redirect("/alumnos");
      console.log(reg);
    });
  });
};
controlador.eliminar = (req, res) => {
  const {
    Matricula
  } = req.params;
  req.getConnection((err, conn) => {
    console.log("Se eliminan ",Matricula)
    if (err) throw err;
    conn.query("DELETE FROM alumnos WHERE Matricula=?", [Matricula], (error, resultados) => {
      if (error) {
        res.json(error);
      }
      res.redirect("/alumnos");
    });
  });
};  

module.exports = controlador;
