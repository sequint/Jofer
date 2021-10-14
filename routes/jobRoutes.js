const router = require('express').Router()
const { Job, User } = require('../models')
const passport = require('passport')


//route for creating a new item
router.post('/jobs', passport.authenticate('jwt'), async function (req, res) {
  //creates a new item from the request.body, for req.user._id
  const job = await Job.create({ ...req.body})
  await Job.findByIdAndUpdate(job._id, { $push: { users: req.user._id }})
  //finds user and then pushes the newly created item into the items array
  await User.findByIdAndUpdate(req.user._id, { $push: { jobs: job._id } })
  res.json(job)
})



module.exports = router

