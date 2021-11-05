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
        type: Boolean,
        default: false
      }],
      employerCountered: [{
        type: Boolean,
        default: false
      }],
      applicantAcceptedOffer: [{
        type: Boolean,
        default: false
      }],
      employerAcceptedOffer: [{
        type: Boolean,
        default: false
      }],
      applicantDeclinedCounter: [{
        type: Boolean,
        default: false
      }],
      employerDeclinedCounter: [{
        type: Boolean,
        default: false
      }]
    }
  }],
  users: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
})

module.exports = model('Job', Job)
