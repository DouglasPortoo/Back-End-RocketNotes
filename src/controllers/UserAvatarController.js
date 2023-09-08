const knex = require("../database/knex")
const AppError = require("../utils/AppError")
const DiskStorage = require("../providers/DiskStorage")
const diskStorage = new DiskStorage()

class UserAvatarController {
  async update(req, res) {
    const user_id = req.user.id
    const avatarfilename = req.file.filename

    const [user] = await knex("users").where({ id: user_id })
    console.log(user)
  

    if (!user) {
      throw new AppError('apenas usuarios cadastrados podem mudar o avatar')
    }

    if (user.avatar) {
      await diskStorage.deleteFile(user.avatar)
    }

    const filename = await diskStorage.saveFile(avatarfilename)
    user.avatar = filename
    console.log(user.avatar)
    
    
    await knex("users").where({ id: user_id }).update("avatar",user.avatar)

    return res.json([user])
  }
}

module.exports = UserAvatarController