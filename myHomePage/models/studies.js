const mongoose = require('mongoose')

// Studies Schema
let studiesSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  grade: {
    type: String,
    required: true
  },
  endDate: {
    type: String,
    required: true
  },
  points: {
    type: String,
    required: true
  },
  institute: {
    type: String,
    required: true
  }
})

const studies = mongoose.model('Studies', studiesSchema)

module.exports = studies
