const { connection } = require('../database/connectionDB');

module.exports = {

    createS: (user, idFactura, result) => {
        connection.query('insert into Solicitud(estadoSolicitud, idFactura, usuario_Agricultor1) values (?, ?, ?)', ['Esperando pago', idFactura, user], (err, rows) => {
            console.log(rows);
            if (err)
                return result(err);

            if (rows.length <= 0) {
                return result(err);
            } else {
                return result(rows);
            }
        });
    },

    getByUser: (user, result) => {
        connection.query('select idSolicitud from Solicitud where usuario_Agricultor1 = ? order by idSolicitud desc limit 1', user, (err, rows) => {
            if (err)
                return result(err);

            if (rows.length <= 0) {
                return result(err);
            } else {
                return result(rows);
            }          
        })
    },
    
    getSolicitudes: (user, result) => {
        connection.query('SELECT * FROM Solicitud WHERE usuario_Agricultor1 = ?', user, (err, rows) => {
            if (err)
                return result(err);

            if (rows.length <= 0) {
                return result(err);
            } else {
                return result(rows);
            }
        });
    }
    
}