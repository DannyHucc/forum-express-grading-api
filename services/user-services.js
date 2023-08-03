const bcrypt = require('bcryptjs')
const { User } = require('../models')

const userServices = {
  signUpPage: async (req, cb) => {
    try {
      return cb(null, null)
    } catch (error) {
      return cb(error)
    }
  },

  signUp: async (req, cb) => {
    try {
      const { name, email, password, passwordCheck } = req.body
      if (password !== passwordCheck) throw new Error('Passwords do not match!')

      const user = await User.findOne({ where: { email } })
      if (user) throw new Error('Email already exists!')

      const hash = await bcrypt.hashSync(password, 10)
      const userData = await User.create({
        name: name,
        email: email,
        password: hash
      })

      return cb(null, userData)
    } catch (error) {
      return cb(error)
    }
  },

  signInPage: async (req, cb) => {
    try {
      return cb(null, null)
    } catch (error) {
      return cb(error)
    }
  }
}

module.exports = userServices
