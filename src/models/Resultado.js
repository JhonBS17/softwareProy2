const { connection } = require('../database/connectionDB');

module.exports = {

    getResults: (user, result) => {
        connection.query('SELECT idResultado, fechaResultado, archivoPDF, idSolicitud1 FROM Resultado JOIN Muestra ON Muestra.idMuestra = Resultado.idMuestra1 where idSolicitud1 in (select idSolicitud from Solicitud where usuario_Agricultor1 = ?)', user, (err, rows) => {
            if (err)
                return result(err);

            if (rows.length <= 0) {
                return result(err);
            } else {
                return result(rows);
            }
        })
    },

    getResult: (idResult, result) => {
        connection.query(`select nombre_Analista, idResultado, fechaResultado, archivoPDF, archivoExcel 
            from Resultado join Muestra join Analista on (Analista.usuario_Analista = Muestra.usuario_Analista1 
            and Resultado.idMuestra1 = Muestra.idMuestra) where idResultado = ?`, idResult, (err, rows) => {
                
            if (err)
                return result(err);

            if (rows.length <= 0) {
                return result(err);
            } else {
                return result(rows);
            }
        });
    },

    resultados: (user, result) => {
        connection.query('select * from Resultado where idMuestra1 in (select idMuestra from Muestra where usuario_Analista1 = ?)', user, (err,  rows) => {
            if (err)
                return result(err);

            if (rows.length <= 0) {
                return result(err);
            } else {
                return result(rows);
            }
        })
    },

    createResult: (idMuestra, files, result) => {
        connection.query('SELECT * FROM Resultado WHERE idMuestra1 = ?', idMuestra, (err, rows) => {
            if (err)
                return result(err);

            if (rows.length) {
                return result(false);
            } else {
                connection.query('INSERT INTO Resultado(archivoPDF, archivoExcel, idMuestra1) VALUES (?, ?, ?)', [files.archivoPDF.name, files.archivoExcel.name, idMuestra], (err,  rows) => {
                    if (err)
                        return result(err);
        
                    if (rows.length <= 0) {
                        return result(err);
                    } else {
                        return result(rows);
                    }
                });
            }
        });
    },

    filterCodigo: (codigo, result) => {
        connection.query('select * from Resultado where idResultado = ?', codigo, (err,  rows) => {
            if (err)
                return result(err);

            if (rows.length <= 0) {
                return result(err);
            } else {
                return result(rows);
            }
        })
    },

    filterFecha: (user, fecha, result) => {
        connection.query('select * from Resultado where idMuestra1 in (select idMuestra from Muestra where usuario_Analista1 = ?) and fechaResultado between ? and ?', [user, fecha.fechaInicio, fecha.fechaFin], (err,  rows) => {
            if (err)
                return result(err);

            if (rows.length <= 0) {
                return result(err);
            } else {
                return result(rows);
            }
        })
    }

}