const categoryServices = require('../../services/category-services')
const { Category } = require('../../models')

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
      const { name } = req.body

      if (!name) throw new Error('Category name is required!')

      const category = await Category.findByPk(req.params.id)
      await category.update({ name })

      return res.redirect('/admin/categories')
    } catch (error) {
      return next(error)
    }
  },

  deleteCategory: async (req, res, next) => {
    try {
      const category = await Category.findByPk(req.params.id)

      if (!category) throw new Error("Category didn't exist!")

      await category.destroy()

      return res.redirect('/admin/categories')
    } catch (error) {
      return next(error)
    }
  }
}

module.exports = categoryController
