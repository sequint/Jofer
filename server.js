require('dotenv').config()

const express = require('express')
const { join } = require('path')
const passport = require('passport')
const { Strategy: LocalStrategy } = require('passport-local')
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt')

const { User } = require('./models')
const syncDB = require('./db')

const app = express()

// Join back end and front end.
app.use(express.static(join(__dirname, 'client', 'build')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Initializing passport.
app.use(passport.initialize())
// Initialize seesion for authentication of user.
app.use(passport.session())

// Create a local strategy to authenticate the user.
passport.use(new LocalStrategy(User.authenticate()))
// Encrypt and decrypt user information (password).
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

// Compare web token to secret on .env file to authenticate user.
passport.use(new JwtStrategy({
  // Take token from the bearer header information passed into axios request for token.
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  // Set var for secret.
  secretOrKey: process.env.SECRET
}, ({ id }, cb) => User.findById(id)
  .populate('jobs')
  .then(user => cb(null, user))
  .catch(err => cb(err))))

app.use(require('./routes'))

// Catch all - if no route is specified, go to the index html file.
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'client', 'build', 'index.html'))
})

// Call the syncDB method form db foder to sync with database, then turn on database.
syncDB()
  .then(() => app.listen(process.env.PORT || 3001))
  .catch(err => console.log(err))
