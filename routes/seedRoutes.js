const router = require('express').Router()
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



  // post route to seed users (for each user in users above register a new user)
  router.post('/users/register', (req, res) => {
    let users = []
    let password = 'seedPassword'

    last_name.forEach(user => {
      let randomFirstName = Math.floor(Math.random() * first_name.length)
      let firstName = first_name[randomFirstName]
      let username = firstName + user + '@seeddata.com'
      let companyName = company[Math.floor(Math.random() * company.length)]
      let jobName ="job"
      let type = 'jobType'
      let reason = 'reason'
      let actionItem = 'action Item'
      let employer =
      {
        first_name: firstName,
        last_name: user,
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
              last_name: last_name,
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
            applicants: []
 
              }
          const job =Job.create({ ...jobPosting })
          Job.findByIdAndUpdate(job._id, { $push: { users: user._id } })
          // finds user and then pushes the newly created job into the jobs array
          User.findByIdAndUpdate(user._id, { $push: { jobs: job._id } })
          console.log(job)


          }
    })




    })
    res.json(200)

    
    // users.forEach(user => {
    //   User.register(new User({ username: user.username }), user.password, err => {
    //     if (err) { console.log(err) }
    //     res.sendStatus(200)
    //   })
    // })
  })


module.exports = router