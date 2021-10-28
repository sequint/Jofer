const { model, Schema } = require('mongoose')

const Negotiation = new Schema({
  offer: Integer,
  counter: Integer,
  finalSalary: Integer,
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
