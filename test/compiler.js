import path from 'path'
import webpack from 'webpack'
import merge from 'webpack-merge'
import MemoryFS from 'memory-fs'
import del from 'del'

const outputConfig = options => {
  return {
    path: path.resolve(__dirname, './.output/' + options.output || ''),
    filename: '[name].bundle.js',
  }
}

const moduleConfig = options => {
  return {
    rules: options.rules
      ? options.rules
      : [
          {
            test: (options.loader && options.loader.test) || /\.txt/,
            use: [
              'raw-loader',
              {
                loader: 'i18n-placeholder-loader',
                options: (options.loader && options.loader.options) || {},
              },
            ],
          },
        ],
  }
}

const baseConfig = {
  mode: 'development',
  devtool: false,
  resolveLoader: {
    alias: {
      'i18n-placeholder-loader': require.resolve('../src'),
    },
  },
}

const compiler = options => {
  const config = merge({}, baseConfig, {
    entry: require.resolve('./fixtures'),
    output: outputConfig(options),
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './fixtures', options.entry),
      },
    },
    module: moduleConfig(options),
  })

  if (options.output) {
    del.sync(config.output.path)
  }

  const webpackCompiler = webpack(config)
  if (!options.output) {
    webpackCompiler.outputFileSystem = new MemoryFS()
  }

  return new Promise((resolve, reject) => {
    webpackCompiler.run((error, stats) => {
      if (error) reject(error)
      resolve(stats)
    })
  })
}

export default compiler
