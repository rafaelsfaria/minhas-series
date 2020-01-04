const express = require('express')

const router = express.Router()
const seriesController = require('../controllers/series')

const Series = require('../models/series')
const models = {
  Series
}

router.get('/', seriesController.index.bind(null, models))

router.get('/nova', seriesController.createForm)
router.post('/nova', seriesController.create.bind(null, models))

router.get('/excluir/:id', seriesController.remove.bind(null, models))

router.get('/editar/:id', seriesController.editForm.bind(null, models))
router.post('/editar/:id', seriesController.edit.bind(null, models))

router.get('/info/:id', seriesController.info.bind(null, models))
router.post('/info/:id', seriesController.createComment.bind(null, models))

module.exports = router