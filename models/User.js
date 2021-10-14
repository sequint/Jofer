const { model, Schema } = require('mongoose')

const User = new Schema({
  first_name: String,
  last_name: String,
  email: {
    type: String,
    required: true,
    match: /.+\@.+\..+/,
    unique: true
  }
  user_type: String,
  company: String,
  jobs: [{
    type: Schema.Types.ObjectId,
    ref: 'Job'
  }]
})

User.plugin(require('passport-local-mongoose'))

module.exports = model('User', User)
