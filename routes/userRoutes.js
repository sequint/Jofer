const router = require('express').Router()
const { User } = require('../models')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const { json } = require('express')

// Get current user information.
router.get('/user', passport.authenticate('jwt'), (req, res) => res.json(req.user))

// Create a new user.
router.post('/users/register', (req, res) => {
  const { first_name, last_name, email, user_type, company } = req.body
  // Use mongoose to create new instance of a user with passpost authentication.
  User.register(new User({ first_name, last_name, email, user_type, company }), req.body.password, err => {
    if (err) {
      res.json({
        err: err,
        req: {
          first_name: first_name,
          last_name: last_name,
          email: email,
          user_type: user_type,
          company: company,
          password: req.body.password
        }
      })
    }
    else {
      res.json({
        status: 200,
        user: {
          first_name: first_name,
          last_name: last_name,
          email: email,
          user_type: user_type,
          company: company,
          password: req.body.password
        }
      })
    }
  })
})

// Authenicate a user and sign them in if user params match. (token to secret)
router.post('/users/login', (req, res) => {
  User.authenticate()(req.body.email, req.body.password, (err, user) => {
    if (err) { console.log(err) }
    res.json(user ? jwt.sign({ id: user._id }, process.env.SECRET) : null)
  })
})
