const { Category } = require('../models')

const categoryServices = {
  getCategories: async (req, cb) => {
    try {
      const [categories, category] = await Promise.all([
        Category.findAll({ raw: true }),
        req.params.id ? Category.findByPk(req.params.id, { raw: true }) : null
      ])

      return cb(null, { categories, category })
    } catch (error) {
      return cb(error)
    }
  },

  postCategory: async (req, cb) => {
    try {
      const { name } = req.body

      if (!name) throw new Error('Category name is required!')

      const category = await Category.create({ name })
      return cb(null, category)
    } catch (error) {
      return cb(error)
    }
  },

  putCategory: async (req, cb) => {
    try {
      const { name } = req.body

      if (!name) throw new Error('Category name is required!')

      const category = await Category.findByPk(req.params.id)

      const categoryData = await category.update({ name })

      return cb(null, categoryData)
    } catch (error) {
      return cb(error)
    }
  }
}

module.exports = categoryServices
