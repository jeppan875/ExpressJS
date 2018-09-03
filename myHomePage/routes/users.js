const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const passport = require('passport')

// Bring in User Model
let User = require('../models/user')

// Register Form
router.get('/register', function (req, res) {
  res.render('register')
})

// Register Proccess
router.post('/register', function (req, res) {
  const email = req.body.email
  const username = req.body.username
  const password = req.body.password
 // const password2 = req.body.password2
  let newUser = new User({
    email: email,
    username: username,
    password: password
  })
  bcrypt.genSalt(10, function (err, salt) {
    if (err) {
      console.log(err)
    }
    bcrypt.hash(newUser.password, salt, function (err, hash) {
      if (err) {
        console.log(err)
      }
      newUser.password = hash
      newUser.save(function (err) {
        if (err) {
          console.log(err)
        } else {
         //  req.flash('success', 'You are now registered and can log in')
          res.redirect('/users/login')
        }
      })
    })
  })
})

// Login Form
router.get('/login', function (req, res) {
  res.render('login')
})

// Login Process
router.post('/login', function (req, res, next) {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login'
    // failureFlash: true
  })(req, res, next)
})

// logout
router.get('/logout', function (req, res, next) {
  console.log(req.user + 'loghhhhhhhhhhhhhhhhh')
  console.log(req.isAuthenticated())
  req.logout()

  res.redirect('/')
})

module.exports = router
