const { model, Schema } = require('mongoose')

const Negotiation = new Schema({
  offer: Number,
  counter: Number,
  finalSalary: Number,
  acceptedOffer: false,
  declinedCounter: false,
  job: {
    type: Schema.Types.ObjectId,
    ref: 'Job'
  },
  users: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
})

module.exports = model('Negotiation', Negotiation)
