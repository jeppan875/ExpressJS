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
router.get('/add', function (req, res) {
  res.render('addWork')
})
module.exports = router
