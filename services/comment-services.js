const { Comment, User, Restaurant } = require('../models')

const commentServices = {
  postComment: async (req, cb) => {
    try {
      const { restaurantId, text } = req.body
      const userId = req.user.id

      if (!text) throw new Error('Comment text is required!')

      const [user, restaurant] = await Promise.all([
        User.findByPk(userId),
        Restaurant.findByPk(restaurantId)
      ])

      if (!user) throw new Error("User didn't exist!")
      if (!restaurant) throw new Error("Restaurant didn't exist!")

      const comment = await Comment.create({
        text,
        restaurantId,
        userId
      })

      return cb(null, comment)
    } catch (error) {
      return cb(error)
    }
  },

  deleteComment: async (req, cb) => {
    try {
      const comment = await Comment.findByPk(req.params.id)

      if (!comment) throw new Error("Comment didn't exist!'")

      const deletedComment = await comment.destroy()

      return cb(null, deletedComment.toJSON())
    } catch (error) {
      return cb(error)
    }
  }
}

module.exports = commentServices
