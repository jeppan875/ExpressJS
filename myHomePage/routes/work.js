const express = require('express')
const router = express.Router()
const Studies = require('../models/studies')

router.get('/', (req, res) => {
  Studies.find({}, (err, studies) => {
    console.log('work')
    if (err) {
      console.log(err)
    } else {  
      res.render('work', {
        name: studies[0].name,
        description: studies[0].description
      })
    }
  })
})

module.exports = router
