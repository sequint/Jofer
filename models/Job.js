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
    declined: {
      reasons: [{
        type: String
      }],
      actionItems: [{
        type: String
      }]
    },
    offered: {
      email: String,
      offer: [{
        type: Number
      }],
      applicantCounter: [{
        type: Number
      }],
      employerCounter: [{
        type: Number
      }],
      finalSalary: [{
        type: Number
      }],
      applicantCountered: [{
        type: Boolean
      }],
      employerCountered: [{
        type: Boolean
      }],
      applicantAcceptedOffer: [{
        type: Boolean
      }],
      employerAcceptedOffer: [{
        type: Boolean
      }],
      applicantDeclinedCounter: [{
        type: Boolean
      }],
      employerDeclinedCounter: [{
        type: Boolean
      }]
    }
  }],
  users: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
})

module.exports = model('Job', Job)
