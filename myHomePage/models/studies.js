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
  }
}, {collection: 'studies'})

const studies = mongoose.model('Studies', studiesSchema)

module.exports = studies
