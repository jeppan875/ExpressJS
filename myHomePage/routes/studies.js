const express = require('express')
const router = express.Router()
const Studies = require('../models/studies')

router.get('/add', function (req, res) {
  res.render('add_study', {
    success: req.session.success,
    errors: req.session.errors || false
  })
  console.log(req.session.errors)
  req.session.errors = null
})

router.get('/delete/:id', function (req, res, next) {
  let query = {_id: req.params.id}
  Studies.deleteOne(query, function (err) {
    if (err) {
      console.log(err)
    } else {
      res.redirect('/studies')
    }
  })
})

router.get('/edit/:id', function (req, res) {
  Studies.findById(req.params.id, function (err, studies) {
    if (err) {
      console.log(err)
    } else {
      res.render('edit_study', {
        studies,
        success: req.session.success,
        errors: req.session.errors || false
      })
    }
  })
  req.session.errors = null
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
  req.checkBody('name', 'Course name is required').notEmpty()
  req.checkBody('description', 'Author is required').notEmpty()
  req.checkBody('endDate', 'End date is required').notEmpty()
  req.checkBody('points', 'Points is required').notEmpty()
  req.checkBody('grade', 'Grade is required').notEmpty()
  req.checkBody('institute', 'Institute is required').notEmpty()

  // Get Errors
  let errors = req.validationErrors()

  if (errors) {
    console.log(errors)
    req.session.errors = errors
    req.session.success = false
    res.redirect('/studies/add')
  } else {
    console.log(req.body)
    let studies = new Studies()
    studies.name = req.body.name
    studies.description = req.body.description
    studies.grade = req.body.grade
    studies.endDate = req.body.endDate
    studies.points = req.body.points
    studies.institute = req.body.institute
    studies.save(function (err) {
      if (err) {
        console.log(err)
      } else {
        req.session.success = true
       // req.flash('success', 'Article Added')
        res.redirect('/')
      }
    })
  }
})
router.post('/edit/:id', function (req, res) {
  req.checkBody('name', 'Course name is required').notEmpty()
  req.checkBody('description', 'Author is required').notEmpty()
  req.checkBody('endDate', 'End date is required').notEmpty()
  req.checkBody('points', 'Points is required').notEmpty()
  req.checkBody('grade', 'Grade is required').notEmpty()

  // Get Errors
  let errors = req.validationErrors()

  if (errors) {
    console.log(errors)
    req.session.errors = errors
    req.session.success = false
    res.redirect('/studies/edit/:id')
  } else {
    let studies = {}
    studies.name = req.body.name
    studies.description = req.body.description
    studies.grade = req.body.grade
    studies.endDate = req.body.endDate
    studies.points = req.body.points
    let query = {_id: req.params.id}

    Studies.update(query, studies, function (err) {
      if (err) {
        console.log(err)
      } else {
        res.redirect('/studies')
      }
    })
  }
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
