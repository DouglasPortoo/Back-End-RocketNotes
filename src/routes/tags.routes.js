const { Router } = require('express')

const TagsController = require('../controllers/TagsController')
const tagsController = new TagsController()

const ensureAuth = require("../middleware/ensureAuth")

const tagsRoutes = Router()

tagsRoutes.get('/',ensureAuth, tagsController.index)

module.exports = tagsRoutes
