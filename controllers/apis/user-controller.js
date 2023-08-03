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
  }
}

module.exports = userController
