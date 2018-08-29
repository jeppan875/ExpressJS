const express = require('express')
const router = express.Router()
const Studies = require('../models/studies')

router.get('/add', function (req, res) {
  res.render('addstudy')
})

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
router.post('/add', function (req, res) {
 // req.checkBody('title','Title is required').notEmpty();
  //req.checkBody('author','Author is required').notEmpty();
//  req.checkBody('body','Body is required').notEmpty();

  // Get Errors
 // let errors = req.validationErrors();

/*  if (errors) {
    res.render('add_article', {
      title:'Add Article',
      errors:errors
    })
  } else { */
  let studies = new Studies()
  studies.name = req.body.name
  studies.description = req.body.description
  studies.grade = req.body.grade
  studies.endDate = req.body.endDate
  studies.points = req.body.points
  studies.save(function (err) {
    if (err) {
      console.log(err)
    } else {
     // req.flash('success', 'Article Added')
      res.redirect('/')
    }
  })
  // }
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
