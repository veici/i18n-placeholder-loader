const pattern = require('./pattern')

module.exports = function loader(source) {
  pattern.forEach(v => {
    source = source.replace(v.pattern, v.replacement)
  })
  return source
}
