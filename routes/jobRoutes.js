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

//get all jobs that the candidate has been assigned to by email
router.get('/jobs/emails', passport.authenticate('jwt'), async function (req, res){
  let emails = await Job.find({})
  let userJobs = []
  emails.forEach(job=>{
    job.applicantEmails.forEach(email=>{
      if(email===req.user.username){  
        userJobs.push({
          jobId:job._id,
          name: job.name,
          company: job.company,
          type: job.type,
          status: job.status,
          declineReason: job.declineReason,
          userId:req.user._id
        })
      }
    })
  })
  res.json({userJobs})
  })




module.exports = router

