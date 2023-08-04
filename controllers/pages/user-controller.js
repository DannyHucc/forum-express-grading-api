const { User, Restaurant, Favorite, Like, Followship } = require('../../models')
const userServices = require('../../services/user-services')

const userController = {
  signUpPage: async (req, res, next) => {
    try {
      return userServices.signUpPage(req, (err, _data) => err ? next(err) : res.render('signup'))
    } catch (error) {
      return next(error)
    }
  },

  signUp: async (req, res, next) => {
    try {
      return userServices.signUp(req, (err, data) => {
        if (err) next(err)
        req.flash('success_messages', 'register success!')
        req.session.signUpData = data
        return res.redirect('/signin')
      })
    } catch (error) {
      return next(error)
    }
  },

  signInPage: async (req, res, next) => {
    try {
      return userServices.signInPage(req, (err, _data) => err ? next(err) : res.render('signin'))
    } catch (error) {
      return next(error)
    }
  },

  signIn: async (req, res, next) => {
    try {
      return userServices.signIn(req, (err, data) => {
        if (err) next(err)
        req.flash('success_messages', '成功登入！')
        req.session.userData = data.userData
        req.session.jwtData = data.token
        return res.redirect('/restaurants')
      })
    } catch (error) {
      return next(error)
    }
  },

  logout: async (req, res, next) => {
    try {
      req.flash('success_messages', '登出成功！')
      return userServices.logout(req, (err, data) => err ? next(err) : res.redirect('/signin'))
    } catch (error) {
      return next(error)
    }
  },

  getUser: async (req, res, next) => {
    try {
      return userServices.getUser(req, (err, data) => err
        ? next(err)
        : res.render('users/profile', {
          user: data.userData,
          comments: data.comments
        }))
    } catch (error) {
      return next(error)
    }
  },

  editUser: async (req, res, next) => {
    try {
      return userServices.editUser(req, (err, data) => err
        ? next(err)
        : res.render('users/edit', { user: data.user })
      )
    } catch (error) {
      return next(error)
    }
  },

  putUser: async (req, res, next) => {
    try {
      req.flash('success_messages', '使用者資料編輯成功')
      return userServices.putUser(req, (err, data) => {
        if (err) return next(err)
        req.session.putedData = data
        return res.redirect(`/users/${req.params.id}`)
      })
    } catch (error) {
      return next(error)
    }
  },

  getTopUsers: async (req, res, next) => {
    try {
      return userServices.getTopUsers(req, (err, data) => err ? next(err) : res.render('top-users', { users: data }))
    } catch (error) {
      return next(error)
    }
  },

  addFavorite: async (req, res, next) => {
    try {
      return userServices.addFavorite(req, (err, data) => {
        if (err) return next(err)
        req.flash('success_messages', 'You have successfully added this restaurant to favorite')
        req.session.addedData = data
        res.redirect('back')
      })
    } catch (error) {
      return next(error)
    }
  },

  removeFavorite: async (req, res, next) => {
    try {
      const userId = req.user.id
      const { restaurantId } = req.params

      const [restaurant, favorite] = await Promise.all([
        Restaurant.findByPk(restaurantId),
        Favorite.findOne({
          where: { userId, restaurantId }
        })
      ])

      if (!restaurant) throw new Error("Restaurant doesn't exist")
      if (!favorite) throw new Error("You have'n favorited this restaurant")

      await favorite.destroy()
      req.flash('success_messages', 'You have successfully removed favorite from this restaurant')

      return res.redirect('back')
    } catch (error) {
      return next(error)
    }
  },

  addLike: async (req, res, next) => {
    try {
      const userId = req.user.id
      const { restaurantId } = req.params

      const [restaurant, like] = await Promise.all([
        Restaurant.findByPk(restaurantId),
        Like.findOne({
          where: {
            userId,
            restaurantId
          }
        })
      ])

      if (!restaurant) throw new Error("Restaurant doesn't exist")
      if (like) throw new Error('You have liked this restaurant!')

      await Like.create({
        userId,
        restaurantId
      })
      req.flash('success_messages', 'You have successfully added this restaurant to like')

      return res.redirect('back')
    } catch (error) {
      return next(error)
    }
  },

  removeLike: async (req, res, next) => {
    try {
      const userId = req.user.id
      const { restaurantId } = req.params

      const [restaurant, like] = await Promise.all([
        Restaurant.findByPk(restaurantId),
        Like.findOne({
          where: { userId, restaurantId }
        })
      ])

      if (!restaurant) throw new Error("Restaurant doesn't exist")
      if (!like) throw new Error("You haven't liked this restaurant")

      await like.destroy()
      req.flash('success_messages', 'You have successfully removed like from this restaurant')

      return res.redirect('back')
    } catch (error) {
      return next(error)
    }
  },

  addFollowing: async (req, res, next) => {
    try {
      const { userId } = req.params

      const [user, followship] = await Promise.all([
        User.findByPk(userId),
        Followship.findOne({
          where: {
            followerId: req.user.id,
            followingId: req.params.userId
          }
        })
      ])

      if (!user) throw new Error("User doesn't exist")
      if (followship) throw new Error('You are already following this user!')

      await Followship.create({
        followerId: req.user.id,
        followingId: userId
      })
      req.flash('success_messages', 'You have successfully followed this user to followship')

      return res.redirect('back')
    } catch (error) {
      return next(error)
    }
  },

  removeFollowing: async (req, res, next) => {
    try {
      const { userId } = req.params

      const [user, followship] = await Promise.all([
        User.findByPk(userId),
        Followship.findOne({
          where: {
            followerId: req.user.id,
            followingId: req.params.userId
          }
        })
      ])

      if (!user) throw new Error("User doesn't exist")
      if (!followship) throw new Error("You haven't followed this user!")

      await followship.destroy()
      req.flash('success_messages', 'You have successfully removed user from this followship')

      return res.redirect('back')
    } catch (error) {
      return next(error)
    }
  }
}

module.exports = userController
