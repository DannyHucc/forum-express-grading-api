const categoryServices = require('../../services/category-services')

const categoryController = {
  getCategories: async (req, res, next) => {
    try {
      return categoryServices.getCategories(req, (err, data) => err ? next(err) : res.render('admin/categories', data))
    } catch (error) {
      return next(error)
    }
  },

  postCategory: async (req, res, next) => {
    try {
      return categoryServices.postCategory(req, (err, data) => {
        if (err) return next(err)
        req.session.postedData = data
        return res.redirect('/admin/categories')
      })
    } catch (error) {
      return next(error)
    }
  },

  putCategory: async (req, res, next) => {
    try {
      return categoryServices.putCategory(req, (err, data) => {
        if (err) return next(err)
        req.session.putedData = data
        return res.redirect('/admin/categories')
      })
    } catch (error) {
      return next(error)
    }
  },

  deleteCategory: async (req, res, next) => {
    try {
      return categoryServices.deleteCategory(req, (err, data) => {
        if (err) return next(err)
        req.session.deletedData = data
        return res.redirect('/admin/categories')
      })
    } catch (error) {
      return next(error)
    }
  }
}

module.exports = categoryController
