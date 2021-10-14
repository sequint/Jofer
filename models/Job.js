const { model, Schema } = require('mongoose')

const Job = new Schema({
  name: String,
  company: String,
  type: String,
  status: String,
  declineReason: String,
  user: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
})

module.exports = model('Job', Job)
