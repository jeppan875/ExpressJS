const express = require('express')
const router = express.Router()
const Studies = require('../models/studies')

router.get('/', (req, res) => {
  Studies.find({}, (err, studies) => {
    studies.sort(function (a, b) {
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
router.get('/add', function (err, req, res) {
  if (err) {
    console.log(err)
  }
  res.render('addstudy')
})

module.exports = router
