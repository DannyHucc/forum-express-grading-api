const restaurantServices = require('../../services/restaurant-services')

const restaurantController = {
  getRestaurants: async (req, res, next) => {
    try {
      restaurantServices.getRestaurants(req, (err, data) => err ? next(err) : res.json(data))
    } catch (error) {
      return next(error)
    }
  }
}

module.exports = restaurantController