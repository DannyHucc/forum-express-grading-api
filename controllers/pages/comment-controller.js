const { Comment } = require('../../models')
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
      const comment = await Comment.findByPk(req.params.id)

      if (!comment) throw new Error("Comment didn't exist!'")

      const deletedComment = await comment.destroy()

      return res.redirect(`/restaurants/${deletedComment.restaurantId}`)
    } catch (error) {
      return next(error)
    }
  }
}

module.exports = commentController
