const adminServices = require('../../services/admin-services')

const adminController = {
  getRestaurants: async (req, res, next) => {
    try {
      return adminServices.getRestaurants(req, (err, data) => err ? next(err) : res.json(data))
    } catch (error) {
      return next(error)
    }
  }
}

module.exports = adminController
