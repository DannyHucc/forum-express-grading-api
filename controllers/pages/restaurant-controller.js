const { Restaurant, Category, Comment, User } = require('../../models')
const restaurantServices = require('../../services/restaurant-services')

const restaurantController = {
  getRestaurants: async (req, res, next) => {
    try {
      return restaurantServices.getRestaurants(req, (err, data) => err ? next(err) : res.render('restaurants', data))
    } catch (error) {
      return next(error)
    }
  },

  getRestaurant: async (req, res, next) => {
    try {
      const restaurant = await Restaurant.findByPk(req.params.id, {
        include: [
          Category,
          { model: Comment, include: User },
          { model: User, as: 'FavoritedUsers' },
          { model: User, as: 'LikedUsers' }
        ]
      })

      if (!restaurant) throw new Error("Restaurant didn't exist!")

      await restaurant.increment('viewCounts', {
        where: { id: req.params.id },
        by: 1
      })

      const isFavorited = restaurant.FavoritedUsers.some(f => f.id === req.user.id)
      const isLiked = restaurant.LikedUsers.some(l => l.id === req.user.id)

      return res.render('restaurant', {
        restaurant: restaurant.toJSON(),
        isFavorited,
        isLiked
      })
    } catch (error) {
      return next(error)
    }
  },

  getDashboard: async (req, res, next) => {
    try {
      const restaurant = await Restaurant.findByPk(req.params.id,
        {
          include: Category,
          raw: true,
          nest: true
        })

      if (!restaurant) throw new Error("Restaurant didn't exist!")

      return res.render('dashboard', { restaurant })
    } catch (error) {
      return next(error)
    }
  },

  getFeeds: async (req, res, next) => {
    try {
      const [restaurants, comments] = await Promise.all([
        Restaurant.findAll({
          limit: 10,
          order: [['createdAt', 'DESC']],
          include: [Category],
          raw: true,
          nest: true
        }),
        Comment.findAll({
          limit: 10,
          order: [['createdAt', 'DESC']],
          include: [User, Restaurant],
          raw: true,
          nest: true
        })
      ])

      if (!restaurants) throw new Error("Restaurant didn't exist!")

      return res.render('feeds', { restaurants, comments })
    } catch (error) {
      return next(error)
    }
  },

  getTopRestaurants: async (req, res, next) => {
    try {
      const restaurants = await Restaurant.findAll({
        include: [
          { model: User, as: 'FavoritedUsers' }]
      })
      if (!restaurants) throw new Error("Restaurant didn't exist!")

      const restaurantsData = await restaurants.map(r => ({
        ...r.toJSON(),
        description: r.description.substring(0, 50),
        favoritedCount: r.FavoritedUsers.length,
        isFavorited: r.FavoritedUsers.some(f => f.id === req.user.id)
      }))
        .sort((a, b) => b.favoritedCount - a.favoritedCount)
        .slice(0, 10)

      return res.render('top-restaurants', { restaurants: restaurantsData })
    } catch (error) {
      return next(error)
    }
  }
}

module.exports = restaurantController
