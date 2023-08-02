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
  }
}

module.exports = categoryServices
