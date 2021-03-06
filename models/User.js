const { model, Schema } = require('mongoose')

const User = new Schema({
  first_name: String,
  last_name: String,
  username: {
    type: String,
    required: true,
    match: /.+\@.+\..+/,
    unique: true
  },
  user_type: String,
  company: String,
  skills: [{
    type: String
  }],
  avatar: String,
  jobs: [{
    type: Schema.Types.ObjectId,
    ref: 'Job'
  }]
})

User.plugin(require('passport-local-mongoose'))

module.exports = model('User', User)
