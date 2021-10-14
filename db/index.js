const mongoose = require('mongoose')

// Export an async function that tried to connect to foreign Mongo server, and conencts to local server if that fails.
module.exports = async function syncDB() { await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/rejector_db') }
