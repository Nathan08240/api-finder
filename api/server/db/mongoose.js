const mongoose = require('mongoose')

const url = `mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PWD}@localhost:27017/${process.env.MONGODB_DATABASE}?authSource=admin`
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
  console.log('Connected to MongoDB ')
})
