const userServices = {
  signUpPage: async (req, cb) => {
    try {
      return cb(null, null)
    } catch (error) {
      return cb(error)
    }
  }
}

module.exports = userServices
