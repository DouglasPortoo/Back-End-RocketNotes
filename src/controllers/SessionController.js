const { compare } = require("bcryptjs")
const knex = require("../database/knex")
const AppError = require("../utils/AppError")

const AuthConfig = require("../configs/auth")
const { sign } = require("jsonwebtoken")

class SessionController {
  async create(req, res) {
    const { email, password } = req.body

    const user = await knex("users").where({ email }).first()

    if (!user) {
      throw new AppError('email ou senha invalida', 401)
    }

    if (password) {
      const checkPassword = await compare(password, user.password)

      if (!checkPassword) {
        throw new AppError('email ou senha invalida', 401)
      }
    }

    const { expiresIn, secret } = AuthConfig.jwt

    const token = sign({}, secret, {
      subject: String(user.id),
      expiresIn:"1d"
    })

    return res.json({ user, token })
  }
}

module.exports = SessionController