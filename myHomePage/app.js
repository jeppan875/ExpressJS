const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const config = require('./config/database')
const mongoose = require('mongoose')
const Studies = require('./models/studies')
const session = require('express-session')
const passport = require('passport')
const expressValidator = require('express-validator')
const cookieSession = require('cookie-session')
// const flash = require('connect-flash')

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

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
// Body Parser Middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.use(cookieSession({
  keys: ['key1', 'key2']
}))
// Express Session Middleware
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))
// Passport Config
require('./config/passport')(passport)
// Passport Middleware
app.use(passport.initialize())
app.use(passport.session())
app.use(expressValidator())

app.use(express.static('public'))

app.use(function (req, res, next) {
  res.locals.user = req.user || null
  next()
})

app.get('/', (req, res) => {
  Studies.find({}, (err, studies) => {
    console.log(studies)
    if (err) {
      console.log(err)
    } else {
      res.render('index')
    }
  })
})

let studies = require('./routes/studies')
let work = require('./routes/work')
let about = require('./routes/about')
let users = require('./routes/users')
app.use('/studies', studies)
app.use('/works', work)
app.use('/about', about)
app.use('/users', users)

app.listen(3002, () => {
  console.log('started on 3002')
})
