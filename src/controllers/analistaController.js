const analistaModel = require("../models/Analista"),
    muestras1 = require("../models/Muestra"),
    resultado = require("../models/Resultado"),
    { validationResult } = require('express-validator');

const analista = {};

analista.login = (req, res) => {
    res.render('analista/inicioSesion');
};

analista.getMuestras = (req, res) => {
    muestras1.muestras(req.user.usuario_Analista, (rows) => {
        res.render('analista/main', { muestras: rows, nombre: req.user.nombre_Analista });
    })
};

analista.getMuestra = (req, res) => {
    muestras1.muestra(req.params.id, (rows) => {
        res.render('analista/cargarAn', { 
            datos: rows, 
            nombre: req.user.nombre_Analista,
            message: req.flash('cargarResMessage')
        });
    })
};

analista.getResultados = (req, res) => {
    resultado.resultados(req.user.usuario_Analista, (rows) => {
        res.render('analista/resultados', { resultados: rows, nombre: req.user.nombre_Analista });
    })
};

analista.filtResultados = (req, res) => {
    if (req.query.codigo != '') {
        resultado.filterCodigo(req.query.codigo, (rows) => {
            res.json(rows);
        })
    } else {
        resultado.filterFecha(req.user.usuario_Analista, req.query, (rows) => {
            res.json(rows);
        })
    }
};

analista.cargarResultado = (req, res) => {
    resultado.createResult(req.params.id, req.files, (rows) => {
        if (rows == false) {
            req.flash('cargarResMessage', 'Esta muestra ya posee su correspondiente resultado!')
        } else if (rows.affectedRows == 1) {
            var file1 = req.files.archivoPDF;
            file1.mv(`./src/controllers/files/pdf/${file1.name}`, err => {
                if (err)
                    res.status(500).send({ message: err })
            })
            file1 = req.files.archivoExcel;
            file1.mv(`./src/controllers/files/excel/${file1.name}`, err => {
                if (err)
                    res.status(500).send({ message: err })
            })
            req.flash('cargarResMessage', 'Se ha cargado el resultado con éxito!')
        }
        res.redirect('back'); return;
    })
};

analista.updateProfView = (req, res) => {
    res.render('analista/editarPerfil', {
        usuario: req.user,
        message: req.flash('editarPerfilMessage')
    });
}

analista.updatePassword = (req, res) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
        req.flash('editarPerfilMessage', errors.errors);
        res.redirect('back'); return;
    } else {
        analistaModel.updatePassword(req.user.usuario_Analista, req.body, (rows) => {
            if (rows == false) {
                req.flash('editarPerfilMessage', 'La contraseña actual no es correcta!');
            } else if (rows.affectedRows == 1) {
                req.flash('editarPerfilMessage', 'La contraseña ha sido actualizada con éxito');
            }
            res.redirect('back');
        })
        return;
    }
}

analista.updateEmail = (req, res) => {
    analistaModel.updateEmail(req.user.usuario_Analista, req.body, (rows) => {
        if (rows.affectedRows == 1) {
            req.flash('editarPerfilMessage', 'El correo ha sido actualizado con éxito');
        } else {
            req.flash('editarPerfilMessage', 'La contraseña ingresada es incorrecta');
        }
        res.redirect('back'); return;
    })
}

module.exports = analista;