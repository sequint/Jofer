const { model, Schema } = require('mongoose')

const Job = new Schema({
  name: String,
  company: String,
  type: String,
  status: String,
  applicants: [{
    email: String,
    status: String,
    declineReason: String
  }],
  users: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
})

module.exports = model('Job', Job)
