const { Restaurant, Category } = require('../models')
const { getOffset, getPagination } = require('../helpers/pagination-helper')

const restaurantServices = {
  getRestaurants: async (req, cb, next) => {
    try {
      const categoryId = Number(req.query.categoryId) || ''

      const DEFAULT_LIMIT = 9
      const page = Number(req.query.page) || 1
      const limit = Number(req.query.limit) || DEFAULT_LIMIT
      const offset = getOffset(limit, page)

      const [restaurants, categories] = await Promise.all([
        Restaurant.findAndCountAll({
          include: Category,
          where: {
            ...categoryId ? { categoryId } : {}
          },
          limit,
          offset,
          raw: true,
          nest: true
        }),
        Category.findAll({ raw: true })
      ])

      const favoritedRestaurantsId = req.user?.FavoritedRestaurants ? req.user.FavoritedRestaurants.map(fr => fr.id) : []
      const likedRestaurantsId = req.user?.LikedRestaurants ? req.user.LikedRestaurants.map(lr => lr.id) : []

      const restaurantData = restaurants.rows.map(restaurant => ({
        ...restaurant,
        description: restaurant.description.substring(0, 50),
        isFavorited: favoritedRestaurantsId.includes(restaurant.id),
        isLiked: likedRestaurantsId.includes(restaurant.id)
      }))

      return cb(null, {
        restaurants: restaurantData,
        categories,
        categoryId,
        pagination: getPagination(limit, page, restaurantData.count)
      })
    } catch (error) {
      return next(error)
    }
  }
}

module.exports = restaurantServices
