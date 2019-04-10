import pattern from './pattern'

export default function loader(source) {
  pattern.forEach(v => {
    source = source.replace(v.pattern, v.replacement)
  })

  return source
}
