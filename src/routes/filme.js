const express = require('express');
const router = express.Router();
const filmeController = require('../controllers/filmeController');

router.post('/', filmeController.createFilme);
router.get('/', filmeController.getFilmes);
router.get('/:slug', filmeController.getFilme);
router.put('/:slug', filmeController.updateFilme);
router.patch('/:slug', filmeController.partialUpdateFilme);
router.delete('/:slug', filmeController.deleteFilme);

module.exports = router;
