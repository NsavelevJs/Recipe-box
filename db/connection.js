const mongoose = require('mongoose')
    
let MONGODB_URI = process.env.PROD_MONGODB || 'mongodb://127.0.0.1:27017/foodies_and_goodies'
mongoose
    .connect(MONGODB_URI, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log('Successfully connected to MongoDB.'))
    .catch(error => console.error('Connection error', error.message))
    mongoose.set('debug', true)
module.exports = mongoose.connection