const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { User, Restaurant, Comment, Favorite, Like, Followship } = require('../models')
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
      if (Number(req.user.id) !== Number(req.params.id)) throw new Error('Edit self profile only!')

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
  },

  addFavorite: async (req, cb) => {
    try {
      const userId = req.user.id
      const { restaurantId } = req.params

      const [restaurant, favorite] = await Promise.all([
        Restaurant.findByPk(restaurantId),
        Favorite.findOne({
          where: {
            userId,
            restaurantId
          }
        })
      ])

      if (!restaurant) throw new Error("Restaurant doesn't exist")
      if (favorite) throw new Error('You have favorited this restaurant!')

      const favoriteData = await Favorite.create({
        userId,
        restaurantId
      })

      return cb(null, favoriteData)
    } catch (error) {
      return cb(error)
    }
  },

  removeFavorite: async (req, cb) => {
    try {
      const userId = req.user.id
      const { restaurantId } = req.params

      const [restaurant, favorite] = await Promise.all([
        Restaurant.findByPk(restaurantId),
        Favorite.findOne({
          where: { userId, restaurantId }
        })
      ])

      if (!restaurant) throw new Error("Restaurant doesn't exist")
      if (!favorite) throw new Error("You have'n favorited this restaurant")

      const favoriteData = await favorite.destroy()

      return cb(null, favoriteData.toJSON())
    } catch (error) {
      return cb(error)
    }
  },

  addLike: async (req, cb) => {
    try {
      const userId = req.user.id
      const { restaurantId } = req.params

      const [restaurant, like] = await Promise.all([
        Restaurant.findByPk(restaurantId),
        Like.findOne({
          where: {
            userId,
            restaurantId
          }
        })
      ])

      if (!restaurant) throw new Error("Restaurant doesn't exist")
      if (like) throw new Error('You have liked this restaurant!')

      const likeData = await Like.create({
        userId,
        restaurantId
      })

      return cb(null, likeData)
    } catch (error) {
      return cb(error)
    }
  },

  removeLike: async (req, cb) => {
    try {
      const userId = req.user.id
      const { restaurantId } = req.params

      const [restaurant, like] = await Promise.all([
        Restaurant.findByPk(restaurantId),
        Like.findOne({
          where: { userId, restaurantId }
        })
      ])

      if (!restaurant) throw new Error("Restaurant doesn't exist")
      if (!like) throw new Error("You haven't liked this restaurant")

      const likeData = await like.destroy()

      return cb(null, likeData.toJSON())
    } catch (error) {
      return cb(error)
    }
  },

  addFollowing: async (req, cb) => {
    try {
      const { userId } = req.params

      const [user, followship] = await Promise.all([
        User.findByPk(userId),
        Followship.findOne({
          where: {
            followerId: req.user.id,
            followingId: req.params.userId
          }
        })
      ])

      if (!user) throw new Error("User doesn't exist")
      if (followship) throw new Error('You are already following this user!')

      const follwshoipData = await Followship.create({
        followerId: req.user.id,
        followingId: userId
      })

      return cb(null, follwshoipData)
    } catch (error) {
      return cb(error)
    }
  },

  removeFollowing: async (req, cb) => {
    try {
      const { userId } = req.params

      const [user, followship] = await Promise.all([
        User.findByPk(userId),
        Followship.findOne({
          where: {
            followerId: req.user.id,
            followingId: req.params.userId
          }
        })
      ])

      if (!user) throw new Error("User doesn't exist")
      if (!followship) throw new Error("You haven't followed this user!")

      const followshipData = await followship.destroy()

      return cb(null, followshipData.toJSON())
    } catch (error) {
      return cb(error)
    }
  }
}

module.exports = userServices
