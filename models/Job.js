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
      offer: [{
        type: Number
      }],
      priorCounter: [{
        type: Number
      }],
      counter: [{
        type: Number
      }],
      finalSalary: [{
        type: Number
      }],
      acceptedOffer: [{
        type: Boolean
      }],
      declinedCounter: [{
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
