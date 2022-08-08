const { mainController, paymentController } = require('./controller')

const router = require('express').Router()

router.get('/', mainController)
router.get('/transaction', paymentController)

module.exports = router