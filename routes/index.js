const router = require('express').Router()

router.use('/api', require('./jobRoutes.js'))
router.use('/api', require('./userRoutes.js'))

module.exports = router
