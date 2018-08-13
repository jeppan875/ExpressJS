const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const config = require('./config/database')
const mongoose = require('mongoose')
const Studies = require('./models/studies')
const app = express()

mongoose.connect(config.database)
let db = mongoose.connection

// Check connection
db.once('open', function () {
  console.log('Connected to MongoDB')
})

// Check for DB errors
db.on('error', function (err) {
  console.log(err)
})

const logger = function (req, res, next) {
  console.log('loogging..')
  next()
}

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(logger)

app.get('/', (req, res) => {
  Studies.find({}, (err, studies) => {
    console.log(studies)  
    if (err) {
      console.log(err)
    } else {
      res.render('index', {
        name: studies.name,
        description: studies.description
      })
    }
  })
})

app.listen(3002, () => {
  console.log('started on 3002')
})
