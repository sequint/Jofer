const { model, Schema } = require('mongoose')

const Job = new Schema({
  name: String,
  company: String,
  type: String,
  status: String,
  applicants: [{
    applicantName: String,
    email: String,
    status: String,
    declined: [{
      reason: [{
        type: String
      }],
      actionItems: [{
        type: String
      }]
    }]
  }],
  users: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
})

module.exports = model('Job', Job)
