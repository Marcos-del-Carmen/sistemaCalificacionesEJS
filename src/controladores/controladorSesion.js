const controlador = {};

controlador.iniciar= (req, res) => {
  const datosUsuario={
    usuario: req.body.tfUsuario, 
    passwd: req.body.tfPassword
  };
  
  // console.log(datosUsuario);
  req.getConnection((err, conn) => {
    if (err) throw err;
    conn.query("SELECT * FROM accesos WHERE Correo=? AND Contrasena=?", [datosUsuario.usuario, datosUsuario.passwd], (error, row) => {
      if(row.length==1) {
       req.session.usuario = datosUsuario.usuario;
       req.session.passwd = datosUsuario.passwd;
      //  console.log(req.session);
       res.redirect("/alumnos");
      } else {
        res.redirect("/");
      }
    });
  });
}

controlador.cerrar = (req, res) =>{ 
  delete req.session.usuario;
  delete req.session.passwd;
  res.redirect("/");
};

module.exports = controlador;