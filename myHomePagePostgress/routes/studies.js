const express = require('express')
const router = express.Router()
const config = require('../config/database')
const { Client } = require('pg')
// const authenticated = require('../authenticated/authenticated')

const client = new Client(config)
client.connect()

router.get('/add', function (req, res) {
  res.render('add_study', {
    success: req.session.success,
    errors: req.session.errors || false
  })
  console.log(req.session.errors)
  req.session.errors = null
})

router.get('/delete/:id', function (req, res) {
  client
    .query('delete from studies where id = $1', [req.params.id])
    .then(res.redirect('/studies'))
    .catch(err => console.error(err))
})

router.get('/edit/:id', function (req, res) {
  client
    .query('select * from studies where id=$1', [req.params.id])
    .then(result => {
      const studies = result.rows[0]
      res.render('edit_study', { studies,
        success: req.session.success,
        errors: req.session.errors || false})
    })
    .catch(err => console.error(err))
})

router.get('/', (req, res) => {
  client
    .query('select * from studies')
    .then(result => {
      const studies = result.rows
      studies.sort(function (a, b) {
        return new Date(b.endDate) - new Date(a.endDate)
      })
      res.render('studies', { studies })
    })
.catch(err => console.error(err))
})
router.post('/add', function (req, res) {
  req.checkBody('name', 'Course name is required').notEmpty()
  req.checkBody('description', 'Description is required').notEmpty()
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
    let studies = {}
    studies.name = req.body.name
    studies.description = req.body.description
    studies.grade = req.body.grade
    studies.endDate = req.body.endDate
    studies.points = req.body.points
    studies.institute = req.body.institute
    client
    .query(
      'insert into studies(name, description, grade, enddate, points, institute) values($1, $2, $3, $4, $5, $6)',
      [studies.name, studies.description, studies.grade, studies.endDate, studies.points, studies.institute]
    ).then(res.redirect('/studies'))
    .catch(err => console.error(err))
  }
})

router.post('/edit/:id', function (req, res) {
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
    res.redirect(`/studies/edit/${req.params.id}`)
  } else {
    let studies = {}
    studies.name = req.body.name
    studies.description = req.body.description
    studies.grade = req.body.grade
    studies.endDate = req.body.endDate
    studies.points = req.body.points
    studies.institute = req.body.institute
    let id = req.params.id

    client
    .query(
      'update studies set name=$1, description=$2, grade=$3, enddate=$4, points=$5, institute=$6 where id=$7',
      [studies.name, studies.description, studies.grade, studies.endDate, studies.points, studies.institute, id]
    ).then(res.redirect('/studies'))
    .catch(err => console.error(err))
  }
})

router.get('/:id', function (req, res) {
  let id = req.params.id
  console.log(id)
  client
    .query('select * from studies where id=$1', [req.params.id])
    .then(result => {
      const studies = result.rows[0]
      res.render('course', { studies })
    })
    .catch(err => console.error(err))
})

module.exports = router
