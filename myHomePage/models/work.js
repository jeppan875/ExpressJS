const mongoose = require('mongoose')

// work Schema
let workSchema = mongoose.Schema({
  company: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  startDate: {
    type: String,
    required: true
  },
  endDate: {
    type: String,
    required: true
  }
})

const work = mongoose.model('Work', workSchema)

module.exports = work
