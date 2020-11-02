const { check } = require('express-validator');

function createAgricultor() {
    return [
        check('nombre_Agricultor').matches(/^[a-zA-Z\s]*$/).withMessage('El nombre debe contener caracteres alfabéticos y espacios'),
        check('correo_Agricultor').isEmail().withMessage('El correo ingresado no es válido'),
        check('usuario_Agricultor').isAlphanumeric().withMessage('El usuario debe contener caracteres alfanuméricos').isLength({min: 6, max:15}).withMessage('El usuario debe tener entre 6 y 15 caracteres'),
        check('contrasena_Agricultor', 'La nueva contraseña debe tener al menos 6 caracteres, 2 deben ser números').matches(/^(?=(.*\d){2})[a-zA-Z0-9_]+$/).isLength({min: 6}),
        check('depart_Agricultor').not().equals('0').withMessage('Debe seleccionar un departamento'),
        check('ciudad_Agricultor').not().equals('0').withMessage('Debe seleccionar una ciudad')
    ];
};

function updateProfileDataAgric() {
    return [
        check('nombre_Agricultor').matches(/^[a-zA-Z\s]*$/).withMessage('El nombre debe contener caracteres alfabéticos y espacios'),
        check('depart_Agricultor').not().equals('0').withMessage('Debe seleccionar un departamento'),
        check('ciudad_Agricultor').not().equals('0').withMessage('Debe seleccionar una ciudad')
    ];
};

function updateProfilePassword() {
    return [
        check('newContrasena', 'La nueva contraseña debe tener al menos 6 caracteres, 2 deben ser números').matches(/^(?=(.*\d){2})[a-zA-Z0-9_]+$/).isLength({min: 6}),
    ];
}

module.exports = {createAgricultor, updateProfileDataAgric, updateProfilePassword};