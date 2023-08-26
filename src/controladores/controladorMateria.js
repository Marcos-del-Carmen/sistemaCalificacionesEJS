const controlador = {};

controlador.mostrar = (req, res) => {
  req.getConnection((err, conn) => {

    if (err) throw err;
    conn.query("SELECT * FROM materias", (error, resultados) => {
      if (error) {
        res.json(error);
      }
      // console.log("Los resultados son: ", resultados);
      const usuario = req.session.usuario;
      if (usuario) {
        // console.log("Los resultados sonn: ", resultados);
        res.render("materias.ejs", { data: resultados, usuario });
      }
      else
        res.redirect("/");
    });
  });
};


controlador.agregar = (req, res) => {
  const reg = {
    ClaveMateria: req.body.tfClaveMateria,
    Nombre:      req.body.tfNombre,
    Cuatrimestre:     req.body.tfCuatrimestre,
    
  };

  req.getConnection((err, conn) => {
    if (err) throw err;

    console.log(reg);
    conn.query("INSERT INTO materias SET ?", [reg], (error, resultados) => {
      if (error) {
        // En lugar de enviar una respuesta JSON en caso de error, puedes redirigir con un mensaje en la URL
        res.redirect("/materias?error=" + encodeURIComponent(error.message));
      } else {
        // Si no hay errores, redirige al cliente a la página de alumnos
        res.redirect("/materias");
      }
    });
  });
};


controlador.editar = (req,res) => {
  const ClaveMateria = req.body.tfClaveMateria;

  req.getConnection((err, conn) => {
    if (err) throw err;

    conn.query("SELECT * FROM materias WHERE ClaveMateria = ?", [ClaveMateria], (error, resultados) => {
      if (error) {
        // Manejo del error si ocurre un problema en la consulta
        console.error(error);
        return res.status(500).send("Error al obtener los datos de la materia.");
      }

      if (resultados.length === 0) {
        // Manejo si no se encuentra una materia con esa clave
        return res.status(404).send("Materias no encontrada.");
      }

      const fila = resultados[0]; // Tomamos el primer resultado como la fila a editar
      res.render('materias_editar', { fila, data: resultados }); // Pasamos la fila y los datos a la vista
    });
  });
};

controlador.modificar = (req, res) => {
  const { ClaveMateria } = req.params;
  const reg = {
    ClaveMateria: req.body.tfClaveMateria,
    Nombre: req.body.tfNombre,
    Cuatrimestre: req.body.tfCuatrimestre,
    
  };

  req.getConnection((err, conn) => {
    conn.query("UPDATE materias SET ? WHERE ClaveMateria=?", [reg, ClaveMateria], (error, resultados) => {
      res.redirect("/materias");
      console.log(reg);
    });
  });
};

controlador.eliminar = (req, res) => {
  const { ClaveMateria } = req.params;
  req.getConnection((err, conn) => {
    if (err) throw err;
    conn.query("DELETE FROM materias WHERE ClaveMateria=?", [ClaveMateria], (error, resultados) => {
      if (error) {
        res.json(error);
      }
      res.redirect("/materias");
    });
  });
};

module.exports = controlador;
