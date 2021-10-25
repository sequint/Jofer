const router = require('express').Router()

router.use('/api', require('./jobRoutes.js'))
router.use('/api', require('./userRoutes.js'))
router.use('/seed', require('./seedRoutes.js'))

module.exports = router
