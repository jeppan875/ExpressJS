function ensureAuthenticated (req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  } else {
    res.redirect('/users/login')
  }
}
exports.ensureAuthenticated = ensureAuthenticated
