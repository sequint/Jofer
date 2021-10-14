const { model, Schema } = require('mongoose')

const Job = new Schema({
  name: String,
  company: String,
  type: String,
  status: String,
  declineReason: String,
  candidate: {
    type: Schema.Types.ObjectId,
    ref: 'Candidate'
  },
  employer: {
    type: Schema.Types.ObjectId,
    ref: 'Employer'
  }
})

module.exports = model('Job', Job)
