const index = (req, res) => res.render('home')
const about = (req, res) => res.render('about')

module.exports = {
  index,
  about
}