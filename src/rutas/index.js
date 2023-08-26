const express = require("express");
const route = express.Router();

route.get("/", function(req, res) {
    // console.log("mensaje: ", req.app.locals.user);
    res.render("index.ejs",{
        titulo: "vista Principal"
    });
});

module.exports = route; 