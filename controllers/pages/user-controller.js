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
        return res.redirect('back')
      })
    } catch (error) {
      return next(error)
    }
  },

  removeFavorite: async (req, res, next) => {
    try {
      return userServices.removeFavorite(req, (err, data) => {
        if (err) return next(err)
        req.flash('success_messages', 'You have successfully removed favorite from this restaurant')
        req.session.removedData = data
        return res.redirect('back')
      })
    } catch (error) {
      return next(error)
    }
  },

  addLike: async (req, res, next) => {
    try {
      return userServices.addLike(req, (err, data) => {
        if (err) return next(err)
        req.flash('success_messages', 'You have successfully added this restaurant to like')
        req.session.addedData = data
        return res.redirect('back')
      })
    } catch (error) {
      return next(error)
    }
  },

  removeLike: async (req, res, next) => {
    try {
      return userServices.removeLike(req, (err, data) => {
        if (err) return next(err)
        req.flash('success_messages', 'You have successfully removed like from this restaurant')
        req.session.removedData = data
        return res.redirect('back')
      })
    } catch (error) {
      return next(error)
    }
  },

  addFollowing: async (req, res, next) => {
    try {
      return userServices.addFollowing(req, (err, data) => {
        if (err) return next(err)
        req.flash('success_messages', 'You have successfully followed this user to followship')
        req.session.addedData = data
        return res.redirect('back')
      })
    } catch (error) {
      return next(error)
    }
  },

  removeFollowing: async (req, res, next) => {
    try {
      return userServices.removeFollowing(req, (err, data) => {
        if (err) return next(err)
        req.flash('success_messages', 'You have successfully removed user from this followship')
        req.session.addedData = data
        return res.redirect('back')
      })
    } catch (error) {
      return next(error)
    }
  }
}

module.exports = userController
