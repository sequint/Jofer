const router = require('express').Router()
const { response } = require('express')
const { User, Job } = require('../models')



let employer =
{
  first_name: 'String',
  last_name: 'String',
  username: '',
  user_type: 'employer',
  company: 'String',
}


let first_name = [
  'Liam',
  'Olivia',
  'Noah',
  'Emma',
  'Oliver',
  'Ava',
  'Elijah',
  'Charlotte',
  'William',
  'Sophia',
  'James',
  'Amelia',
  'Benjamin',
  'Isabella',
  'Lucas',
  'Mia',
  'Henry',
  'Evelyn',
  'Alexander',
  'Harper'
]

let last_name = [
  'SMITH',
  'JOHNSON',
  'WILLIAMS',
  'BROWN',
  'JONES',
  'GARCIA',
  'MILLER',
  'DAVIS',
  'RODRIGUEZ',
  'MARTINEZ',
  'HERNANDEZ',
  'LOPEZ',
  'GONZALEZ',
  'WILSON',
  'ANDERSON',
  'THOMAS',
  'TAYLOR',
  'MOORE',
  'JACKSON',
  'MARTIN',
  'LEE',
  'PEREZ',
  'THOMPSON',
  'WHITE',
  'HARRIS',
  'SANCHEZ',
  'CLARK'

]

let company = [
  'Apple',
  'Samsung Electronics',
  'Foxconn',
  'Aplhabet',
  'Microsoft',
  'Huawei',
  'Dell Technologies',
  'Tesla',
  'TSMC',
  'Adobe',
  'Netflix',
  'Yahoo',
  'PayPal',
  'Oracle',
  'Intel',
  'IBM',
  'Airbnb',
  'Snap',
  'Palantir'
]
let jobs = [
  'Senior Backend Developer',
  'Sr. Front End Developer',
  'Back End Developer',
  'Software Developer',
  'Digital Web Producer',
  'Net Developer',
  'Junior Software Developer',
  'React Web Developer',
  'Web Developer',
  'Jr. Software Developer',
  'Senior .Net Developer (Back-End)',
  'Lead Software Engineer',
  'Engineer Software'

]

let jobType = [
  'Engineering',
  'Software',
  'Web Design'
]

let jobReasons = [
  "Not required skillset",
  "Didn't Know Ruby",
  "Didn't Know React",
  "Lack of experience",
  "Not the correct fit",
  "Lack of experience",
  "Not enough knowledge on job",
  "Lack of Javascript skills",
  "Failed tech interview",
  "No database knowledge",
  "Didn't know SQL",
  'Needs more work experience'
]

let jobActions = [
  'Learn React',
  'Learn Ruby',
  'Learn Node',
  'Learn Java',
  'Learn Javascript',
  'Practice Data structures',
  'Gain more experience',
  'Make your own projects',
  'Learn about time-complexity',
  'Be more prepared',
  'Gain 1 year of a practical internship',
  'Needs managerial experience',
  'Gain experience with core languages',
  "Learn what Big O notation is"


]



// post route to seed users (for each user in users above register a new user)
router.post('/seed/users', (req, res) => {
  let users = []
  let password = 'seedPassword'

  last_name.forEach(lastName => {
    let randomFirstName = Math.floor(Math.random() * first_name.length)
    let firstName = first_name[randomFirstName]
    let username = firstName + lastName + '@seeddata.com'
    let companyName = company[Math.floor(Math.random() * company.length)]
    let fullName = firstName + ' ' + lastName

    let jobName = jobs[Math.floor(Math.random() * jobs.length)]
    let type = jobType[Math.floor(Math.random() * jobType.length)]

    let applicants = Math.floor(Math.random() * 3)

    let reason = []
    let actionItems = []
    for (let i = 0; i < 2; i++) {
      reason.push(jobReasons[Math.floor(Math.random() * jobReasons.length)])
      actionItems.push(jobActions[Math.floor(Math.random() * jobActions.length)])
    }
    let employer =
    {
      first_name: firstName,
      last_name: lastName,
      username: username,
      user_type: 'employer',
      company: companyName,
    }
    users.push(employer)
    User.register(new User({ ...employer }), password, (err, user) => {
      if (err) {
        res.json({
          err: err,
          req: {
            first_name: first_name,
            last_name: lastName,
            username: username,
            user_type: user_type,
            company: company,
            password: password
          }
        })
      } else {


        let jobPosting = {
          name: jobName,
          company: companyName,
          type: type,
          status: 'Declined',
          applicants: [{
            applicantName: fullName,
            email: username,
            status: "Declined",
            declined: {
              reasons: reason,
              actionItems: actionItems
            }
          }]

        }
        const job = Job.create({ ...jobPosting })
        Job.findByIdAndUpdate(job._id, { $push: { users: user._id } })
        // finds user and then pushes the newly created job into the jobs array
        User.findByIdAndUpdate(user._id, { $push: { jobs: job._id } })
        console.log(job)


      }

    })




  })
  res.json(users)


  // users.forEach(user => {
  //   User.register(new User({ username: user.username }), user.password, err => {
  //     if (err) { console.log(err) }
  //     res.sendStatus(200)
  //   })
  // })
})


module.exports = router


