const { Restaurant, Category } = require('../models')

const adminServices = {
  getRestaurants: async (req, cb, next) => {
    try {
      const restaurants = await Restaurant.findAll({
        raw: true,
        nest: true,
        include: [Category]
      })
      return cb(null, { restaurants })
    } catch (error) {
      return next(error)
    }
  }
}

module.exports = adminServices
