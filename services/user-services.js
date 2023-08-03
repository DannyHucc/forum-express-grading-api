const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { User, Restaurant, Comment } = require('../models')
const { imgurFileHandler } = require('../helpers/file-helpers')

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
  },

  signIn: async (req, cb) => {
    try {
      const userData = req.user.toJSON()
      delete userData.password
      const token = jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: '30d' })
      return cb(null, { userData, token })
    } catch (error) {
      return cb(error)
    }
  },

  logout: async (req, cb) => {
    try {
      req.logout()
      return cb(null, null)
    } catch (error) {
      return cb(error)
    }
  },

  getUser: async (req, cb) => {
    try {
      const userId = req.params.id

      const [user, comments] = await Promise.all([
        User.findByPk(req.params.id, {
          include: [
            { model: User, as: 'Followers' },
            { model: User, as: 'Followings' },
            { model: Restaurant, as: 'FavoritedRestaurants' }
          ],
          nest: true
        }),
        Comment.findAll({
          raw: true,
          nest: true,
          where: { userId },
          include: Restaurant
        })
      ])

      if (!user) throw new Error("User doesn't exists!")

      const userData = user.toJSON()

      return cb(null, { userData, comments })
    } catch (error) {
      return cb(error)
    }
  },

  editUser: async (req, cb) => {
    try {
      const user = await User.findByPk(req.params.id, {
        raw: true
      })

      if (!user) throw new Error("User doesn't exists!")

      return cb(null, { user })
    } catch (error) {
      return cb(error)
    }
  },

  putUser: async (req, cb) => {
    try {
      const { name } = req.body
      if (!name) throw new Error('User name is required!')

      const [user, filePath] = await Promise.all([
        User.findByPk(req.params.id),
        imgurFileHandler(req.file)
      ])
      if (!user) throw new Error("User doesn't exists!")

      const userData = await user.update({
        name,
        image: filePath || user.image
      })

      return cb(null, userData)
    } catch (error) {
      return cb(error)
    }
  },

  getTopUsers: async (req, cb) => {
    try {
      const users = await User.findAll({
        include: [
          { model: User, as: 'Followers' }]
      })

      const usersData = await users.map(user => ({
        ...user.toJSON(),
        followerCount: user.Followers.length,
        isFollowed: req.user.Followings.some(f => f.id === user.id)
      }))
        .sort((a, b) => b.followerCount - a.followerCount)

      return cb(null, usersData)
    } catch (error) {
      return cb(error)
    }
  }
}

module.exports = userServices
