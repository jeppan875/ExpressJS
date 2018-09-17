const express = require('express')
const router = express.Router()
const { Client } = require('pg')
// const authenticated = require('../authenticated/authenticated')
const config = require('../config/database')
const client = new Client(config)
client.connect()

router.get('/add', function (req, res) {
  res.render('add_work', {
    success: req.session.success,
    errors: req.session.errors || false
  })
  req.session.errors = null
})

router.get('/delete/:id', async function (req, res, next) {
  await client.query('delete from works where id = $1', [req.params.id])
  res.redirect('/works')
})

router.get('/edit/:id', async function (req, res) {
  const result = await client.query('select * from works where id=$1', [req.params.id])
  const works = result.rows[0]
  res.render('edit_work', { works,
    success: req.session.success,
    errors: req.session.errors || false}
  )
})

router.get('/', async (req, res) => {
  const result = await client.query('select * from works')
  const works = result.rows
  works.sort(function (a, b) {
    return new Date(b.endDate) - new Date(a.endDate)
  })
  res.render('works', { works })
})

router.post('/add', async function (req, res) {
  req.checkBody('company', 'Company name is required').notEmpty()
  req.checkBody('description', 'Description is required').notEmpty()
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
    let work = {}
    work.company = req.body.company
    work.description = req.body.description
    work.startDate = req.body.startDate
    work.endDate = req.body.endDate
    await client
    .query(
      'insert into works(company, description, startdate, enddate) values($1, $2, $3, $4)',
      [work.company, work.description, work.startDate, work.endDate]
    )
    res.redirect('/works')
  }
})

router.post('/edit/:id', async function (req, res) {
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
    let id = req.params.id

    await client
    .query(
      'update works set company=$1, description=$2, startdate=$3, enddate=$4 where id=$5',
      [work.company, work.description, work.startDate, work.endDate, id]
    )
    res.redirect('/works')
  }
})

router.get('/:id', async function (req, res) {
  const result = await client.query('select * from works where id=$1', [req.params.id])
  const works = result.rows[0]
  res.render('work', { works })
})

module.exports = router
