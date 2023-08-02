const adminServices = require('../../services/admin-services')

const adminController = {
  getRestaurants: async (req, res, next) => {
    try {
      return adminServices.getRestaurants(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
    } catch (error) {
      return next(error)
    }
  },

  createRestaurant: async (req, res, next) => {
    try {
      return adminServices.createRestaurant(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
    } catch (error) {
      return next(error)
    }
  },

  postRestaurant: async (req, res, next) => {
    try {
      return adminServices.postRestaurant(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
    } catch (error) {
      return next(error)
    }
  },

  getRestaurant: async (req, res, next) => {
    try {
      return adminServices.getRestaurant(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
    } catch (error) {
      return next(error)
    }
  },

  editRestaurant: async (req, res, next) => {
    try {
      return adminServices.editRestaurant(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
    } catch (error) {
      return next(error)
    }
  },

  putRestaurant: async (req, res, next) => {
    try {
      return adminServices.putRestaurant(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
    } catch (error) {
      return next(error)
    }
  },

  deleteRestaurant: async (req, res, next) => {
    try {
      return adminServices.deleteRestaurant(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
    } catch (error) {
      return next(error)
    }
  },

  getUsers: async (req, res, next) => {
    try {
      return adminServices.getUsers(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
    } catch (error) {
      return next(error)
    }
  }
}

module.exports = adminController
