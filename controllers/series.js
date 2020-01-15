const labels = [
  { status: 'to-watch', name: 'Para assistir' },
  { status: 'watching', name: 'Assistindo' },
  { status: 'watched', name: 'Assistido' }
]

const pagination = async (model, conditions, params) => {
  const total = await model.countDocuments(conditions)
  const pageSize = parseInt(params.pageSize) || 20
  const currentPage = parseInt(params.page) || 0

  const pagination = {
    currentPage,
    pageSize,
    pages: parseInt(total/pageSize)
  }

  const results = await model
    .find(conditions)
    .skip(currentPage * pageSize)
    .limit(pageSize)

  return {
    data: results,
    pagination
  }
}

const index = async ({ Series }, req, res) => {
  const results = await pagination(Series, {}, req.query)
  res.render('series/index', { results, labels })
}

const create = async ({ Series }, req, res) => {
  const serie = new Series(req.body)
  try {
    await serie.save()
    res.redirect('/series')
  } catch (e) {
    console.log(Object.keys(e.errors))
    res.render('series/create', { errors: Object.keys(e.errors) })
  }
}

const createForm = (req, res) => res.render('series/create', { errors: [] })

const remove = async ({ Series }, req, res) => {
  await Series.deleteOne({ _id: req.params.id })
  res.redirect('/series')
}

const editForm = async ({ Series }, req, res) => {
  const doc = await Series.findOne({ _id: req.params.id  })
  res.render('series/edit', { serie: doc, labels, errors: [] })
}

const edit = async ({ Series }, req, res) => {
  const serie = await Series.findOne({ _id: req.params.id })
  serie.name = req.body.name
  serie.status = req.body.status
  try {
    await serie.save()
    res.redirect('/series')
  } catch (e) {
    res.render('series/edit', { errors: Object.keys(e.errors), labels, serie })
  }
}

const info = async ({ Series }, req, res) => {
  const doc = await Series.findOne({ _id: req.params.id  })
  res.render('series/info', { serie: doc })
}

const createComment =  async({ Series }, req, res) => {
  await Series.updateOne({ _id: req.params.id }, { $push: { comments: req.body.comment }})
  res.redirect(`/series/info/${req.params.id}`)
}

module.exports = {
  index,
  create,
  createForm,
  remove,
  editForm,
  edit,
  info,
  createComment
}