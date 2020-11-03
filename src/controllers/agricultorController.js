const resultado = require("../models/Resultado"),
    solicitud = require("../models/Solicitud"),
    muestra = require("../models/Muestra"),
    agricultor1 = require("../models/Agricultor"),
    colombia = require('../public/js/colombia.json'),
    { validationResult } = require('express-validator');

const agricultor = {};
var muestras = [];

agricultor.requestAn = (req, res) => {
    res.render('agricultor/analysisRequest', { nombreUsuario: req.user.nombre_Agricultor });
};

agricultor.requestMuestra = (req, res) => {
    muestras.push(req.body);
    res.send({});
};

agricultor.requestSave = (req, res) => {

    console.log("idFactura: "+req.query.x_id_factura);
    solicitud.createS(req.user.usuario_Agricultor, req.query.x_id_factura, (rows) => {
        console.log(rows);
    });

    solicitud.getByUser(req.user.usuario_Agricultor, (rows1) => {
        var cont = 0;

        for (let index = 0; index < muestras.length; index++) {
            muestra.createM(muestras[index], rows1[0].idSolicitud, (rows) => {
                cont = cont + 1;
            });
        }
        muestras = [];
        muestra.solicMuestras(rows1[0].idSolicitud, (rows2) => {
            console.log(rows2);
            req.flash('solicMuestrasMessage', 'Se ha creado la solicitud con éxito. Debe tener en cuenta los siguientes ID de sus muestras');
            res.render('agricultor/muestras', {
                muestras: rows2,
                nombreUsuario: req.user.usuario_Agricultor,
                solicitud: rows1[0], 
                message: req.flash('solicMuestrasMessage')
            });
        })
    })
};

agricultor.reqMuestras = (req, res) => {
    res.send(muestras);
}

agricultor.requestDelete = (req, res) => {
    if (muestras.length == 0) {
        res.send(false);
    } else {
        muestras = [];
        res.send(true);
    }
};

agricultor.getResults = (req, res) => {
    resultado.getResults(req.user.usuario_Agricultor, (rows) => {
        var res1 = rows;
        solicitud.getSolicitudes(req.user.usuario_Agricultor, (rows1) => {
            res.render('agricultor/main', {
                resultados: res1,
                solicitudes: rows1,
                nombreUsuario: req.user.nombre_Agricultor
            });
        })
    })
};

agricultor.result = (req, res) => {
    resultado.getResult(req.params.id, (rows) => {
        res.render('agricultor/result', { resultado: rows[0], usuario: req.user });
    })
};

agricultor.updateProfile = (req, res) => {
    res.render('agricultor/editarP', {
        data: colombia,
        usuario: req.user,
        message: req.flash('editarPerfilMessage')
    });
};

agricultor.updatePassword = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.flash('editarPerfilMessage', errors.errors);
        res.redirect('back'); return;
    } else {
        agricultor1.updatePassword(req.user.usuario_Agricultor, req.body, (rows) => {
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

agricultor.updateData = (req, res) => {
    const body = req.body,
        user = req.user;

    if (body.nombre_Agricultor == user.nombre_Agricultor && body.depart_Agricultor == user.depart_Agricultor
        && body.ciudad_Agricultor == user.ciudad_Agricultor) {
        req.flash('editarPerfilMessage', 'No hay información por actualizar');
        res.redirect('back');
        return;
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.flash('editarPerfilMessage', errors.errors);
    } else {
        agricultor1.updateData(req.user.usuario_Agricultor, req.body, (rows) => {
            console.log(rows);
            if (rows.affectedRows == 1) {
                req.flash('editarPerfilMessage', 'Sus datos han sido actualizados con éxito');
                res.redirect('back');
            }
        })
    }
}

agricultor.updateEmail = (req, res) => {
    agricultor1.updateEmail(req.user.usuario_Agricultor, req.body, (rows) => {
        if (rows.affectedRows == 1) {
            req.flash('editarPerfilMessage', 'El correo ha sido actualizado con éxito');
        } else {
            req.flash('editarPerfilMessage', 'La contraseña ingresada es incorrecta');
        }
        res.redirect('back'); return;
    })
}

agricultor.downloadPDF = (req, res) => {
    const file = `${__dirname}/files/pdf/${req.params.file}`;
    res.download(file);
};

agricultor.downloadExcel = (req, res) => {
    const file = `${__dirname}/files/excel/${req.params.file}`;
    res.download(file);
};

agricultor.pagoConf = (req, res) => {
    //res.render('test', { resultado: req.body })
    res.send('ok');
    console.log(req.query);
}

module.exports = agricultor;