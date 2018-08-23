const express = require('express')
const router = express.Router()
const Studies = require('../models/studies')

router.get('/', (req, res) => {
  Studies.find({}, (err, studies) => {
    studies.sort(function (a, b) {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
      return new Date(b.endDate) - new Date(a.endDate)
    })
    if (err) {
      console.log(err)
    } else {
      res.render('studies', {
        studies
      })
    }
  })
})

router.get('/:id', function (req, res) {
  Studies.findById(req.params.id, function (err, studies) {
    if (err) {
      console.log(err)
    } else {
      res.render('course', {
        studies
      })
    }
  })
})

module.exports = router
