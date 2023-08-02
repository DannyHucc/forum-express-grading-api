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
  },

  patchUser: async (req, res, next) => {
    try {
      adminServices.patchUser(req, (err, data) => {
        if (err) return next(err)

        if (data.toString() === 'false') {
          return res.json({
            status: 'success',
            error_messages: '禁止變更 root 權限'
          })
        }

        if (data) {
          return res.json({
            status: 'success',
            success_messages: '使用者權限變更成功'
          })
        }
      })
    } catch (error) {
      return next(error)
    }
  }
}

module.exports = adminController
