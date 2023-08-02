const { Restaurant, Category, User } = require('../models')
const { imgurFileHandler } = require('../helpers/file-helpers')

const adminServices = {
  getRestaurants: async (req, cb) => {
    try {
      const restaurants = await Restaurant.findAll({
        raw: true,
        nest: true,
        include: [Category]
      })
      return cb(null, { restaurants })
    } catch (error) {
      return cb(error)
    }
  },

  createRestaurant: async (req, cb) => {
    try {
      const categories = await Category.findAll({
        raw: true
      })
      return cb(null, { categories })
    } catch (error) {
      return cb(error)
    }
  },

  getRestaurant: async (req, cb) => {
    try {
      const restaurant = await Restaurant.findByPk(
        req.params.id,
        {
          raw: true,
          nest: true,
          include: [Category]
        })
      if (!restaurant) throw new Error("Restaurant didn't exist!")

      return cb(null, { restaurant })
    } catch (error) {
      return cb(error)
    }
  },

  editRestaurant: async (req, cb) => {
    try {
      const [restaurant, categories] = await Promise.all([
        Restaurant.findByPk(req.params.id, { raw: true }),
        Category.findAll({ raw: true })
      ])
      if (!restaurant) throw new Error("Restaurant didn't exist!")

      return cb(null, { restaurant, categories })
    } catch (error) {
      return cb(error)
    }
  },

  postRestaurant: async (req, cb) => {
    try {
      const { name, tel, address, openingHours, description, categoryId } = req.body
      if (!name) throw new Error('Restaurant name is required!')

      const { file } = req
      const [filePath] = await Promise.all([imgurFileHandler(file)])

      const newRestaurant = await Restaurant.create({
        name,
        tel,
        address,
        openingHours,
        description,
        image: filePath || null,
        categoryId
      })

      return cb(null, { restaurant: newRestaurant })
    } catch (error) {
      return cb(error)
    }
  },

  putRestaurant: async (req, cb) => {
    try {
      const { name, tel, address, openingHours, description, categoryId } = req.body
      if (!name) throw new Error('Restaurant name is required!')

      const { file } = req

      const [restaurant, filePath] = await Promise.all([
        Restaurant.findByPk(req.params.id),
        imgurFileHandler(file)
      ])

      if (!restaurant) throw new Error("Restaurant didn't exist!")

      const newRestaurant = await restaurant.update({
        name,
        tel,
        address,
        openingHours,
        description,
        image: filePath || restaurant.image,
        categoryId
      })

      return cb(null, { newRestaurant })
    } catch (error) {
      return cb(error)
    }
  },

  deleteRestaurant: async (req, cb) => {
    try {
      const restaurant = await Restaurant.findByPk(req.params.id)
      if (!restaurant) {
        const err = new Error("Restaurant didn't exist!")
        err.status = 404
        throw err
      }

      const deletedRestaurant = await restaurant.destroy()
      return cb(null, { restaurant: deletedRestaurant })
    } catch (error) {
      return cb(error)
    }
  },

  getUsers: async (req, cb) => {
    try {
      const users = await User.findAll({ raw: true, nest: true })
      return cb(null, { users })
    } catch (error) {
      return cb(error)
    }
  }
}

module.exports = adminServices
