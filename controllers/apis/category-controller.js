const categoryServices = require('../../services/category-services')

const categoryController = {
  getCategories: async (req, res, next) => {
    try {
      return categoryServices.getCategories(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
    } catch (error) {
      return next(error)
    }
  },

  postCategory: async (req, res, next) => {
    try {
      return categoryServices.postCategory(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
    } catch (error) {
      return next(error)
    }
  },

  putCategory: async (req, res, next) => {
    try {
      return categoryServices.putCategory(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
    } catch (error) {
      return next(error)
    }
  }
}

module.exports = categoryController
