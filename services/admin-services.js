const { Restaurant, Category } = require('../models')
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
  }
}

module.exports = adminServices
