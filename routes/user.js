const express = require('express')
const router = express.Router()
const controllers = require('../controllers')
const middleware = require('../helper/middleware')

router.put('/update', middleware.mustLogin, controllers.user.updateBio)
router.delete('/delete', middleware.mustLogin, controllers.user.deleteUser)

module.exports = router
