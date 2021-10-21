const router = require('express').Router()
const { Job, User } = require('../models')
const passport = require('passport')

// route for creating a new job
router.post('/jobs', passport.authenticate('jwt'), async function (req, res) {
  // creates a new job from the request.body, for req.user._id
  const job = await Job.create({ ...req.body })
  await Job.findByIdAndUpdate(job._id, { $push: { users: req.user._id } })
  // finds user and then pushes the newly created job into the jobs array
  await User.findByIdAndUpdate(req.user._id, { $push: { jobs: job._id } })
  res.json(job)
})

// get all jobs that the candidate has been assigned to by email
router.get('/jobs/emails', passport.authenticate('jwt'), async function (req, res) {
  const emails = await Job.find({})
  const userJobs = []
  emails.forEach(job => {
    job.applicants.forEach(email => {
      if (email.email === req.user.username) {
        userJobs.push({
          jobId: job._id,
          name: job.name,
          company: job.company,
          type: job.type,
          email: email.email,
          status: email.status,
          declineReason: email.declineReason,
          userId: req.user._id
        })
      }
    })
  })
  res.json({ userJobs })
})

router.get('/jobs', async function (req, res) {

  const jobs = await Job.find({})
  res.json(jobs)
})

// route for employers to populate their jobs
router.get('/jobs/id', passport.authenticate('jwt'), async function (req, res) {
  res.json(req.user.jobs)
})

// route for updating a job located by req.params.id
router.put('/jobs/:id', passport.authenticate('jwt'), async function (req, res) {
  // find item by it then set the passed in p
  await Job.findByIdAndUpdate(req.params.id, { $set: req.body })
  res.sendStatus(200)
})

// route for deleting a job located by req.para.id
router.delete('/jobs/:id', passport.authenticate('jwt'), async function (req, res) {
  // find item by id and delete
  await Job.findByIdAndDelete(req.params.id)
  // find user, then update by pulling req.params.id from the users jobs array
  await User.findByIdAndUpdate(req.user._id, { $pull: { jobs: req.params.id } })
  res.sendStatus(200)
})

module.exports = router
