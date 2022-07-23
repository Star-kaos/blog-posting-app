const express = require('express')
const router = express.Router()

router.get('/', function (req, res) {
    res.redirect('/article')
})

module.exports = router

