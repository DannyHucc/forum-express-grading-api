const restaurantServices = require('../../services/restaurant-services')

const restaurantController = {
  getRestaurants: async (req, res, next) => {
    try {
      return restaurantServices.getRestaurants(req, (err, data) => err ? next(err) : res.json(data))
    } catch (error) {
      return next(error)
    }
  },

  getRestaurant: async (req, res, next) => {
    try {
      return restaurantServices.getRestaurant(req, (err, data) => err ? next(err) : res.json({ data }))
    } catch (error) {
      return next(error)
    }
  }
}

module.exports = restaurantController
