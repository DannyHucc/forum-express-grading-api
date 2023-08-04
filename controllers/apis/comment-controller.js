const commentServices = require('../../services/comment-services')

const commentController = {
  postComment: async (req, res, next) => {
    try {
      return commentServices.postComment(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
    } catch (error) {
      return next(error)
    }
  }
}

module.exports = commentController
