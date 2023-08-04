const commentServices = require('../../services/comment-services')

const commentController = {
  postComment: async (req, res, next) => {
    try {
      return commentServices.postComment(req, (err, data) => {
        if (err) return next(err)
        req.session.postedData = data
        res.redirect(`/restaurants/${data.restaurantId}`)
      })
    } catch (error) {
      return next(error)
    }
  },

  deleteComment: async (req, res, next) => {
    try {
      return commentServices.deleteComment(req, (err, data) => {
        if (err) return next(err)
        req.session.deletedData = data
        return res.redirect(`/restaurants/${data.restaurantId}`)
      })
    } catch (error) {
      return next(error)
    }
  }
}

module.exports = commentController
