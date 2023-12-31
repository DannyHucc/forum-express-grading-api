const userServices = require('../../services/user-services')

const userController = {
  signUpPage: async (req, res, next) => {
    try {
      return userServices.signUpPage(req, (err, _data) => err ? next(err) : res.json({ status: 'success' }))
    } catch (error) {
      return next(error)
    }
  },

  signUp: async (req, res, next) => {
    try {
      return userServices.signUp(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
    } catch (error) {
      return next(error)
    }
  },

  signInPage: async (req, res, next) => {
    try {
      return userServices.signInPage(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
    } catch (error) {
      return next(error)
    }
  },

  signIn: async (req, res, next) => {
    try {
      return userServices.signIn(req, (err, data) => err
        ? next(err)
        : res.json({
          status: 'success',
          data: {
            token: data.token,
            user: data.userData
          }
        }))
    } catch (error) {
      return next(error)
    }
  },

  logout: async (req, res, next) => {
    try {
      return userServices.logout(req, (err, _data) => err ? next(err) : res.json({ status: 'success' }))
    } catch (error) {
      return next(error)
    }
  },

  getUser: async (req, res, next) => {
    try {
      return userServices.getUser(req, (err, data) => err
        ? next(err)
        : res.json({
          status: 'success',
          data
        }))
    } catch (error) {
      return next(error)
    }
  },

  editUser: async (req, res, next) => {
    try {
      return userServices.editUser(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
    } catch (error) {
      return next(error)
    }
  },

  putUser: async (req, res, next) => {
    try {
      return userServices.putUser(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
    } catch (error) {
      return next(error)
    }
  },

  getTopUsers: async (req, res, next) => {
    try {
      return userServices.getTopUsers(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
    } catch (error) {
      return next(error)
    }
  },

  addFavorite: async (req, res, next) => {
    try {
      return userServices.addFavorite(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
    } catch (error) {
      return next(error)
    }
  },

  removeFavorite: async (req, res, next) => {
    try {
      return userServices.removeFavorite(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
    } catch (error) {
      return next(error)
    }
  },

  addLike: async (req, res, next) => {
    try {
      return userServices.addLike(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
    } catch (error) {
      return next(error)
    }
  },

  removeLike: async (req, res, next) => {
    try {
      return userServices.removeLike(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
    } catch (error) {
      return next(error)
    }
  },

  addFollowing: async (req, res, next) => {
    try {
      return userServices.addFollowing(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
    } catch (error) {
      return next(error)
    }
  },

  removeFollowing: async (req, res, next) => {
    try {
      return userServices.removeFollowing(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
    } catch (error) {
      return next(error)
    }
  }
}

module.exports = userController
