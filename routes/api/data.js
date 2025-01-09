const express = require('express')
const router = express.Router()

const dataController = require('../../controllers/dataController')

router.route('/')
    .post(dataController.addUser)

router.route(`/:username`)
    .get(dataController.getUserData)
    .put(dataController.updateData)


module.exports = router