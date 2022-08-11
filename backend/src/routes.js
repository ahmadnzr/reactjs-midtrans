const authorize = require('./common/auth')
const { mainController, paymentController } = require('./controller')

const router = require('express').Router()

router.get('/', mainController)
router.get('/transaction', authorize, paymentController)

module.exports = router