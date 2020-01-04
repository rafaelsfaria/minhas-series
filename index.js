const path = require('path')
const express = require('express')
const mongoose = require('mongoose')

const pages = require('./routes/pages')
const series = require('./routes/series')

mongoose.Promise = global.Promise

const port = process.env.PORT || 3000
const mongo = process.env.MONGODB || 'mongodb://localhost:27017/minhas-series'

const app = express()

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use('/', pages)
app.use('/series', series)

mongoose.connect(mongo, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(port, () => console.log('listening on 3000')))
  .catch((err) => console.log(err))