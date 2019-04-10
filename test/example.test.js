import webpack from './compiler'

test('Should work', async () => {
  const stats = await webpack({
    entry: 'example.html',
    output: 'example',
    loader: {
      test: /.html/,
    },
  })
  const source = stats.toJson().modules[0].source
  expect(source).toMatch(/中文/)
})
