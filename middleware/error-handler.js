module.exports = {
  generalErrorHandler: async (err, req, res, next) => {
    try {
      if (err instanceof Error) {
        req.flash('error_messages', `${err.name}: ${err.message}`)
      } else {
        req.flash('error_messages', `${err}`)
      }
      return res.redirect('back')
    } catch (error) {
      return next(error)
    }
  },

  apiErrorHandler: async (err, req, res, next) => {
    try {
      if (err instanceof Error) {
        return res.status(err.status || 500).json({
          status: 'error',
          message: `${err.name}: ${err.message}`
        })
      } else {
        return res.status(500).json({
          status: 'error',
          message: `${err}`
        })
      }
    } catch (error) {
      return next(error)
    }
  }
}
