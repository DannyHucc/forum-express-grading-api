const { User } = require('../../models')
const adminServices = require('../../services/admin-services')

const adminController = {
  getRestaurants: async (req, res, next) => {
    try {
      return adminServices.getRestaurants(req, (err, data) => err ? next(err) : res.render('admin/restaurants', data))
    } catch (error) {
      return next(error)
    }
  },

  createRestaurant: async (req, res, next) => {
    try {
      return adminServices.createRestaurant(req, (err, data) => err ? next(err) : res.render('admin/create-restaurant', data))
    } catch (error) {
      return next(error)
    }
  },

  postRestaurant: async (req, res, next) => {
    try {
      return adminServices.postRestaurant(req, (err, data) => {
        if (err) return next(err)
        req.flash('success_messages', 'restaurant was successfully created')
        req.session.postedData = data
        return res.redirect('/admin/restaurants')
      })
    } catch (error) {
      return next(error)
    }
  },

  getRestaurant: async (req, res, next) => {
    try {
      return adminServices.getRestaurant(req, (err, data) => err ? next(err) : res.render('admin/restaurant', data))
    } catch (error) {
      return next(error)
    }
  },

  editRestaurant: async (req, res, next) => {
    try {
      return adminServices.editRestaurant(req, (err, data) => err ? next(err) : res.render('admin/edit-restaurant', data))
    } catch (error) {
      return next(error)
    }
  },

  putRestaurant: async (req, res, next) => {
    try {
      return adminServices.putRestaurant(req, (err, data) => {
        if (err) return next(err)
        req.flash('success_messages', 'restaurant was successfully to update')
        req.session.putedData = data
        res.redirect('/admin/restaurants')
      })
    } catch (error) {
      return next(error)
    }
  },

  deleteRestaurant: async (req, res, next) => {
    try {
      return adminServices.deleteRestaurant(req, (err, data) => {
        if (err) return next(err)
        req.session.deletedData = data
        return res.redirect('/admin/restaurants')
      })
    } catch (error) {
      return next(error)
    }
  },

  getUsers: async (req, res, next) => {
    try {
      return adminServices.getUsers(req, (err, data) => err ? next(err) : res.render('admin/users', data))
    } catch (error) {
      return next(error)
    }
  },

  patchUser: async (req, res, next) => {
    try {
      const { id } = req.params

      const user = await User.findByPk(id)
      if (!user) throw new Error("User didn't exist!")
      if (user.email === 'root@example.com') {
        req.flash('error_messages', '禁止變更 root 權限')
        return res.redirect('back')
      }

      await user.update({ isAdmin: !user.isAdmin })
      req.flash('success_messages', '使用者權限變更成功')
      return res.redirect('/admin/users')
    } catch (error) {
      return next(error)
    }
  }
}

module.exports = adminController
