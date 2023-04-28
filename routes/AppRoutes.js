const express = require('express')
const { start,category, notfound, search } = require('../controllers/AppController.js')

const router = express.Router();

// Pagina de inicio
router.get('/', start)
// Categorias
router.get('/categories/:id', category)

//Pagina 404
router.get('/404', notfound)

// Buscador
router.post('/search', search)

module.exports = router;

