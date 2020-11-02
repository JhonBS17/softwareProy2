var express = require('express');
var router = express.Router();

var analista = require('../controllers/analistaController.js');
var validations = require('../controllers/validations.js');

router.get('/principal', isLoggedIn, analista.getMuestras);
router.get('/muestra/:id', isLoggedIn, analista.getMuestra);
router.get('/resultados', isLoggedIn, analista.getResultados);
router.get('/filtroResultados', analista.filtResultados);
router.post('/cargarResultado/:id', isLoggedIn, analista.cargarResultado);
router.get('/updateProfile', isLoggedIn, analista.updateProfView);
router.post('/updateEmail', isLoggedIn, analista.updateEmail);
router.post('/updatePassword', isLoggedIn, validations.updateProfilePassword(), analista.updatePassword);

function isLoggedIn (req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/');
}

module.exports = router;