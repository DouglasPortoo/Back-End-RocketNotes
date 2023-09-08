const { Router } = require('express')
const multer = require('multer')
const uploadConfig = require('../configs/upload')

const UsersController = require('../controllers/UsersController')
const usersController = new UsersController()

const UserAvatarController = require('../controllers/UserAvatarController')
const userAvatarController = new UserAvatarController()

const upload = multer(uploadConfig.MULTER)

const ensureAuth = require("../middleware/ensureAuth")

const usersRoutes = Router()

usersRoutes.get('/:id', usersController.show)
usersRoutes.post('/', usersController.create)
usersRoutes.put('/', ensureAuth, usersController.update)
usersRoutes.patch('/avatar', ensureAuth, upload.single('avatar'), userAvatarController.update)


module.exports = usersRoutes
