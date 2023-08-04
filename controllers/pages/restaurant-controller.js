const { Restaurant, User } = require('../../models')
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
      return restaurantServices.getRestaurant(req, (err, data) => err
        ? next(err)
        : res.render('restaurant', {
          restaurant: data.restaurant,
          isFavorited: data.isFavorited,
          isLiked: data.isLiked
        }))
    } catch (error) {
      return next(error)
    }
  },

  getDashboard: async (req, res, next) => {
    try {
      return restaurantServices.getDashboard(req, (err, data) => err ? next(err) : res.render('dashboard', { restaurant: data.restaurant }))
    } catch (error) {
      return next(error)
    }
  },

  getFeeds: async (req, res, next) => {
    try {
      return restaurantServices.getFeeds(req, (err, data) => err ? next(err) : res.render('feeds', { restaurants: data.restaurants, comments: data.comments }))
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
