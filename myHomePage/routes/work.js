const express = require('express')
const router = express.Router()
const Works = require('../models/work')

router.get('/add', function (req, res) {
  res.render('add_work', {
    success: req.session.success,
    errors: req.session.errors || false
  })
  req.session.errors = null
})
router.get('/delete/:id', function (req, res, next) {
  let query = {_id: req.params.id}
  Works.deleteOne(query, function (err) {
    if (err) {
      console.log(err)
    } else {
      res.redirect('/works')
    }
  })
})
router.get('/delete/:id', function (req, res, next) {
  let query = {_id: req.params.id}
  Works.deleteOne(query, function (err) {
    if (err) {
      console.log(err)
    } else {
      res.redirect('/works')
    }
  })
})

router.get('/edit/:id', function (req, res) {
  Works.findById(req.params.id, function (err, works) {
    if (err) {
      console.log(err)
    } else {
      res.render('edit_work', {
        works,
        success: req.session.success,
        errors: req.session.errors || false
      })
    }
  })
  req.session.errors = null
})
router.get('/', (req, res) => {
  Works.find({}, (err, works) => {
    works.sort(function (a, b) {
      return new Date(b.endDate) - new Date(a.endDate)
    })
    if (err) {
      console.log(err)
    } else {
      res.render('works', {
        works
      })
    }
  })
})

router.post('/add', function (req, res) {
  req.checkBody('company', 'Company name is required').notEmpty()
  req.checkBody('description', 'Author is required').notEmpty()
  req.checkBody('endDate', 'End date is required').notEmpty()
  req.checkBody('startDate', 'Start date is required').notEmpty()

  // Get Errors
  let errors = req.validationErrors()

  if (errors) {
    console.log(errors)
    req.session.errors = errors
    req.session.success = false
    res.redirect('/works/add')
  } else {
    let work = new Works()
    work.company = req.body.company
    work.description = req.body.description
    work.startDate = req.body.startDate
    work.endDate = req.body.endDate
    work.save(function (err) {
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
  req.checkBody('company', 'Company name is required').notEmpty()
  req.checkBody('description', 'Author is required').notEmpty()
  req.checkBody('endDate', 'End date is required').notEmpty()
  req.checkBody('startDate', 'Start date is required').notEmpty()

  // Get Errors
  let errors = req.validationErrors()

  if (errors) {
    console.log(errors)
    req.session.errors = errors
    req.session.success = false
    res.redirect('/works/edit/:id')
  } else {
    let work = {}
    work.company = req.body.company
    work.description = req.body.description
    work.startDate = req.body.startDate
    work.endDate = req.body.endDate
    let query = {_id: req.params.id}

    Works.update(query, work, function (err) {
      if (err) {
        console.log(err)
      } else {
        res.redirect('/works')
      }
    })
  }
})
router.get('/:id', function (req, res) {
  Works.findById(req.params.id, function (err, works) {
    if (err) {
      console.log(err)
    } else {
      res.render('work', {
        works
      })
    }
  })
})
module.exports = router
