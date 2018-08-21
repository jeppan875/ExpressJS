const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const config = require('./config/database')
const mongoose = require('mongoose')
const Studies = require('./models/studies')

const app = express()
app.use(express.static('public'))
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
  console.log(Studies)
  Studies.find({}, (err, studies) => {
    console.log(studies)
    if (err) {
      console.log(err)
    } else {
      res.render('index', {
        name: studies[0].name,
        description: studies[0].description
      })
    }
  })
})

let studies = require('./routes/studies')
let work = require('./routes/work')
let about = require('./routes/about')
app.use('/studies', studies)
app.use('/work', work)
app.use('/about', about)

app.listen(3002, () => {
  console.log('started on 3002')
})
