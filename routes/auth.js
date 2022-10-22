const express = require('express')
const router = express.Router()
const controllers = require('../controllers')
const middleware = require('../helpers/middleware')

router.post('/register', controllers.auth.register)
router.post('/login', controllers.auth.login)
router.post('/logout', middleware.mustLogin, controllers.auth.logout)
router.put('/changePass', middleware.mustLogin, controllers.auth.changePass)

module.exports = router
