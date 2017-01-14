const test = require('ava');
const _ = require('lodash');
const lit = require('bitmate-generator').lit;
const webpackConf = require('../../generators/app/conf');

function merge(args) {
  const result = {};
  _.mergeWith(result, ...args, (x, y) => {
    if (_.isArray(x)) {
      return _.uniq(x.concat(y));
    }
  });
  return result;
}

const conf = {
  module: {
    loaders: [
      {test: lit`/\.json$/`, loaders: ['json-loader']}
    ]
  }
};

test('conf dev with react/css/babel', t => {
  const options = {
    test: false,
    dist: false,
    client: 'react',
    css: 'css',
    js: 'babel'
  };
  const expected = merge([{}, conf, {
    module: {
      loaders: [
        {test: lit`/\.(woff|woff2)$/`, loader: 'url-loader?limit=10000&mimetype=application/font-woff'},
        {test: lit`/\.ttf$/`, loader: 'file-loader'},
        {test: lit`/\.eot$/`, loader: 'file-loader'},
        {test: lit`/\.svg$/`, loader: 'file-loader'},
        {
          test: lit`/.js$/`,
          exclude: lit`/node_modules/`,
          loader: 'eslint-loader',
          enforce: 'pre'
        },
        {
          test: lit`/\\.css$/`,
          loaders: ['style-loader', 'css-loader', 'postcss-loader']
        },
        {
          test: lit`/\\.js$/`,
          exclude: lit`/node_modules/`,
          loaders: ['react-hot-loader', 'babel-loader']}
      ]
    },
    plugins: [
      lit`new webpack.optimize.OccurrenceOrderPlugin()`,
      lit`new webpack.NoErrorsPlugin()`,
      lit`FailPlugin`,
      lit`new HtmlWebpackPlugin({
      template: conf.path.client('index.html')
    })`,
      lit`new webpack.HotModuleReplacementPlugin()`,
      lit`new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })`,
      lit`new webpack.LoaderOptionsPlugin({
      options: {
        postcss: () => [autoprefixer]
      },
      debug: true
    })`
    ],
    devtool: 'source-map',
    output: {
      path: lit`path.join(process.cwd(), conf.paths.tmp)`,
      filename: 'index.js'
    },
    entry: [
      'webpack/hot/dev-server',
      'webpack-hot-middleware/client',
      lit`\`./\${conf.path.client('index')}\``
    ]
  }]);
  const result = webpackConf(options);
  t.deepEqual(result, expected);
});

test('conf dev with react/scss/babel', t => {
  const options = {
    test: false,
    dist: false,
    client: 'react',
    css: 'scss',
    js: 'babel'
  };
  const expected = merge([{}, conf, {
    module: {
      loaders: [
        {test: lit`/\.(woff|woff2)$/`, loader: 'url-loader?limit=10000&mimetype=application/font-woff'},
        {test: lit`/\.ttf$/`, loader: 'file-loader'},
        {test: lit`/\.eot$/`, loader: 'file-loader'},
        {test: lit`/\.svg$/`, loader: 'file-loader'},
        {
          test: lit`/.js$/`,
          exclude: lit`/node_modules/`,
          loader: 'eslint-loader',
          enforce: 'pre'
        },
        {
          test: lit`/\\.(css|scss)$/`,
          loaders: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader']
        },
        {
          test: lit`/\\.js$/`,
          exclude: lit`/node_modules/`,
          loaders: ['react-hot-loader', 'babel-loader']}
      ]
    },
    plugins: [
      lit`new webpack.optimize.OccurrenceOrderPlugin()`,
      lit`new webpack.NoErrorsPlugin()`,
      lit`FailPlugin`,
      lit`new HtmlWebpackPlugin({
      template: conf.path.client('index.html')
    })`,
      lit`new webpack.HotModuleReplacementPlugin()`,
      lit`new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })`,
      lit`new webpack.LoaderOptionsPlugin({
      options: {
        postcss: () => [autoprefixer]
      },
      debug: true
    })`
    ],
    devtool: 'source-map',
    output: {
      path: lit`path.join(process.cwd(), conf.paths.tmp)`,
      filename: 'index.js'
    },
    entry: [
      'webpack/hot/dev-server',
      'webpack-hot-middleware/client',
      lit`\`./\${conf.path.client('index')}\``
    ]
  }]);
  const result = webpackConf(options);
  t.deepEqual(result, expected);
});

test('conf dev with react/less/babel', t => {
  const options = {
    test: false,
    dist: false,
    client: 'react',
    css: 'less',
    js: 'babel'
  };
  const expected = merge([{}, conf, {
    module: {
      loaders: [
        {test: lit`/\.(woff|woff2)$/`, loader: 'url-loader?limit=10000&mimetype=application/font-woff'},
        {test: lit`/\.ttf$/`, loader: 'file-loader'},
        {test: lit`/\.eot$/`, loader: 'file-loader'},
        {test: lit`/\.svg$/`, loader: 'file-loader'},
        {
          test: lit`/.js$/`,
          exclude: lit`/node_modules/`,
          loader: 'eslint-loader',
          enforce: 'pre'
        },
        {
          test: lit`/\\.(css|less)$/`,
          loaders: ['style-loader', 'css-loader', 'less-loader', 'postcss-loader']
        },
        {
          test: lit`/\\.js$/`,
          exclude: lit`/node_modules/`,
          loaders: ['react-hot-loader', 'babel-loader']}
      ]
    },
    plugins: [
      lit`new webpack.optimize.OccurrenceOrderPlugin()`,
      lit`new webpack.NoErrorsPlugin()`,
      lit`FailPlugin`,
      lit`new HtmlWebpackPlugin({
      template: conf.path.client('index.html')
    })`,
      lit`new webpack.HotModuleReplacementPlugin()`,
      lit`new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })`,
      lit`new webpack.LoaderOptionsPlugin({
      options: {
        postcss: () => [autoprefixer]
      },
      debug: true
    })`
    ],
    devtool: 'source-map',
    output: {
      path: lit`path.join(process.cwd(), conf.paths.tmp)`,
      filename: 'index.js'
    },
    entry: [
      'webpack/hot/dev-server',
      'webpack-hot-middleware/client',
      lit`\`./\${conf.path.client('index')}\``
    ]
  }]);
  const result = webpackConf(options);
  t.deepEqual(result, expected);
});

test('conf test with react/css/typescript', t => {
  const options = {
    test: true,
    dist: false,
    client: 'react',
    css: 'css',
    js: 'typescript'
  };
  const expected = merge([{}, conf, {
    module: {
      loaders: [
        {
          test: lit`/.tsx$/`,
          exclude: lit`/node_modules/`,
          loader: 'tslint-loader',
          enforce: 'pre'
        },
        {
          test: lit`/\\.tsx$/`,
          exclude: lit`/node_modules/`,
          loaders: ['ts-loader']
        }
      ]
    },
    plugins: [
      lit`new webpack.LoaderOptionsPlugin({
      options: {
        resolve: {},
        ts: {
          configFileName: 'tsconfig.json'
        },
        tslint: {
          configuration: require('../tslint.json')
        }
      },
      debug: true
    })`
    ],
    devtool: 'source-map',
    resolve: {
      extensions: ['.webpack.js', '.web.js', '.js', '.ts', '.tsx']
    },
    externals: lit`{
    'jsdom': 'window',
    'cheerio': 'window',
    'react/lib/ExecutionEnvironment': 'true',
    'react/lib/ReactContext': 'window',
    'text-encoding': 'window'
  }`
  }]);
  const result = webpackConf(options);
  t.deepEqual(result, expected);
});

test('conf with angular1/scss/js', t => {
  const options = {
    test: false,
    dist: true,
    client: 'angular1',
    css: 'scss',
    js: 'js'
  };
  const expected = merge([{}, conf, {
    module: {
      loaders: [
        {test: lit`/\.(woff|woff2)$/`, loader: 'url-loader?limit=10000&mimetype=application/font-woff'},
        {test: lit`/\.ttf$/`, loader: 'file-loader'},
        {test: lit`/\.eot$/`, loader: 'file-loader'},
        {test: lit`/\.svg$/`, loader: 'file-loader'},
        {
          test: lit`/.js$/`,
          exclude: lit`/node_modules/`,
          loader: 'eslint-loader',
          enforce: 'pre'
        },
        {
          test: lit`/\\.(css|scss)$/`,
          loaders: lit`ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: 'css-loader?minimize!sass-loader!postcss-loader'
        })`
        },
        {
          test: lit`/\\.js$/`,
          exclude: lit`/node_modules/`,
          loaders: ['ng-annotate-loader']
        },
        {
          test: lit`/\.html$/`,
          loaders: ['html-loader']
        }
      ]
    },
    plugins: [
      lit`new webpack.optimize.OccurrenceOrderPlugin()`,
      lit`new webpack.NoErrorsPlugin()`,
      lit`FailPlugin`,
      lit`new HtmlWebpackPlugin({
      template: conf.path.client('index.html')
    })`,
      lit`new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })`,
      lit`new webpack.optimize.UglifyJsPlugin({
      output: {comments: false},
      compress: {unused: true, dead_code: true, warnings: false} // eslint-disable-line camelcase
    })`,
      lit`new ExtractTextPlugin('index-[contenthash].css')`,
      lit`new webpack.optimize.CommonsChunkPlugin({name: 'vendor'})`,
      lit`new webpack.LoaderOptionsPlugin({
      options: {
        postcss: () => [autoprefixer]
      }
    })`
    ],
    output: {
      path: lit`path.join(process.cwd(), conf.paths.dist)`,
      filename: '[name]-[hash].js'
    },
    entry: {
      app: lit`\`./\${conf.path.client('index')}\``,
      vendor: lit`Object.keys(pkg.dependencies)`
    }
  }]);
  const result = webpackConf(options);
  t.deepEqual(result, expected);
});

test('conf with angular1/scss/js', t => {
  const options = {
    test: false,
    dist: true,
    client: 'angular1',
    css: 'scss',
    js: 'js'
  };
  const expected = merge([{}, conf, {
    module: {
      loaders: [
        {test: lit`/\.(woff|woff2)$/`, loader: 'url-loader?limit=10000&mimetype=application/font-woff'},
        {test: lit`/\.ttf$/`, loader: 'file-loader'},
        {test: lit`/\.eot$/`, loader: 'file-loader'},
        {test: lit`/\.svg$/`, loader: 'file-loader'},
        {
          test: lit`/.js$/`,
          exclude: lit`/node_modules/`,
          loader: 'eslint-loader',
          enforce: 'pre'
        },
        {
          test: lit`/\\.(css|scss)$/`,
          loaders: lit`ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: 'css-loader?minimize!sass-loader!postcss-loader'
        })`
        },
        {
          test: lit`/\\.js$/`,
          exclude: lit`/node_modules/`,
          loaders: ['ng-annotate-loader']
        },
        {
          test: lit`/\.html$/`,
          loaders: ['html-loader']
        }
      ]
    },
    plugins: [
      lit`new webpack.optimize.OccurrenceOrderPlugin()`,
      lit`new webpack.NoErrorsPlugin()`,
      lit`FailPlugin`,
      lit`new HtmlWebpackPlugin({
      template: conf.path.client('index.html')
    })`,
      lit`new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })`,
      lit`new webpack.optimize.UglifyJsPlugin({
      output: {comments: false},
      compress: {unused: true, dead_code: true, warnings: false} // eslint-disable-line camelcase
    })`,
      lit`new ExtractTextPlugin('index-[contenthash].css')`,
      lit`new webpack.optimize.CommonsChunkPlugin({name: 'vendor'})`,
      lit`new webpack.LoaderOptionsPlugin({
      options: {
        postcss: () => [autoprefixer]
      }
    })`
    ],
    output: {
      path: lit`path.join(process.cwd(), conf.paths.dist)`,
      filename: '[name]-[hash].js'
    },
    entry: {
      app: lit`\`./\${conf.path.client('index')}\``,
      vendor: lit`Object.keys(pkg.dependencies)`
    }
  }]);
  const result = webpackConf(options);
  t.deepEqual(result, expected);
});

test('conf with angular1/less/js', t => {
  const options = {
    test: false,
    dist: true,
    client: 'angular1',
    css: 'less',
    js: 'js'
  };
  const expected = merge([{}, conf, {
    module: {
      loaders: [
        {test: lit`/\.(woff|woff2)$/`, loader: 'url-loader?limit=10000&mimetype=application/font-woff'},
        {test: lit`/\.ttf$/`, loader: 'file-loader'},
        {test: lit`/\.eot$/`, loader: 'file-loader'},
        {test: lit`/\.svg$/`, loader: 'file-loader'},
        {
          test: lit`/.js$/`,
          exclude: lit`/node_modules/`,
          loader: 'eslint-loader',
          enforce: 'pre'
        },
        {
          test: lit`/\\.(css|less)$/`,
          loaders: lit`ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: 'css-loader?minimize!less-loader!postcss-loader'
        })`
        },
        {
          test: lit`/\\.js$/`,
          exclude: lit`/node_modules/`,
          loaders: ['ng-annotate-loader']
        },
        {
          test: lit`/\.html$/`,
          loaders: ['html-loader']
        }
      ]
    },
    plugins: [
      lit`new webpack.optimize.OccurrenceOrderPlugin()`,
      lit`new webpack.NoErrorsPlugin()`,
      lit`FailPlugin`,
      lit`new HtmlWebpackPlugin({
      template: conf.path.client('index.html')
    })`,
      lit`new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })`,
      lit`new webpack.optimize.UglifyJsPlugin({
      output: {comments: false},
      compress: {unused: true, dead_code: true, warnings: false} // eslint-disable-line camelcase
    })`,
      lit`new ExtractTextPlugin('index-[contenthash].css')`,
      lit`new webpack.optimize.CommonsChunkPlugin({name: 'vendor'})`,
      lit`new webpack.LoaderOptionsPlugin({
      options: {
        postcss: () => [autoprefixer]
      }
    })`
    ],
    output: {
      path: lit`path.join(process.cwd(), conf.paths.dist)`,
      filename: '[name]-[hash].js'
    },
    entry: {
      app: lit`\`./\${conf.path.client('index')}\``,
      vendor: lit`Object.keys(pkg.dependencies)`
    }
  }]);
  const result = webpackConf(options);
  t.deepEqual(result, expected);
});

test('conf with angular1/styl/typescript', t => {
  const options = {
    test: false,
    dist: true,
    client: 'angular1',
    css: 'styl',
    js: 'typescript'
  };
  const expected = merge([{}, conf, {
    module: {
      loaders: [
        {test: lit`/\.(woff|woff2)$/`, loader: 'url-loader?limit=10000&mimetype=application/font-woff'},
        {test: lit`/\.ttf$/`, loader: 'file-loader'},
        {test: lit`/\.eot$/`, loader: 'file-loader'},
        {test: lit`/\.svg$/`, loader: 'file-loader'},
        {
          test: lit`/.ts$/`,
          exclude: lit`/node_modules/`,
          loader: 'tslint-loader',
          enforce: 'pre'
        },
        {
          test: lit`/\\.(css|styl|stylus)$/`,
          loaders: lit`ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: 'css-loader?minimize!stylus-loader!postcss-loader'
        })`
        },
        {
          test: lit`/\\.ts$/`,
          exclude: lit`/node_modules/`,
          loaders: ['ng-annotate-loader', 'ts-loader']
        },
        {
          test: lit`/\.html$/`,
          loaders: ['html-loader']
        }
      ]
    },
    plugins: [
      lit`new webpack.optimize.OccurrenceOrderPlugin()`,
      lit`new webpack.NoErrorsPlugin()`,
      lit`FailPlugin`,
      lit`new HtmlWebpackPlugin({
      template: conf.path.client('index.html')
    })`,
      lit`new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })`,
      lit`new webpack.optimize.UglifyJsPlugin({
      output: {comments: false},
      compress: {unused: true, dead_code: true, warnings: false} // eslint-disable-line camelcase
    })`,
      lit`new ExtractTextPlugin('index-[contenthash].css')`,
      lit`new webpack.optimize.CommonsChunkPlugin({name: 'vendor'})`,
      lit`new webpack.LoaderOptionsPlugin({
      options: {
        postcss: () => [autoprefixer],
        resolve: {},
        ts: {
          configFileName: 'tsconfig.json'
        },
        tslint: {
          configuration: require('../tslint.json')
        }
      }
    })`
    ],
    output: {
      path: lit`path.join(process.cwd(), conf.paths.dist)`,
      filename: '[name]-[hash].js'
    },
    resolve: {
      extensions: ['.webpack.js', '.web.js', '.js', '.ts']
    },
    entry: {
      app: lit`\`./\${conf.path.client('index')}\``,
      vendor: lit`Object.keys(pkg.dependencies)`
    }
  }]);
  const result = webpackConf(options);
  t.deepEqual(result, expected);
});

test('conf with react/css/typescript', t => {
  const options = {
    test: false,
    dist: false,
    client: 'react',
    css: 'css',
    js: 'typescript'
  };
  const expected = merge([{}, conf, {
    module: {
      loaders: [
        {test: lit`/\.(woff|woff2)$/`, loader: 'url-loader?limit=10000&mimetype=application/font-woff'},
        {test: lit`/\.ttf$/`, loader: 'file-loader'},
        {test: lit`/\.eot$/`, loader: 'file-loader'},
        {test: lit`/\.svg$/`, loader: 'file-loader'},
        {
          test: lit`/.tsx$/`,
          exclude: lit`/node_modules/`,
          loader: 'tslint-loader',
          enforce: 'pre'
        },
        {
          test: lit`/\\.css$/`,
          loaders: ['style-loader', 'css-loader', 'postcss-loader']
        },
        {
          test: lit`/\\.tsx$/`,
          exclude: lit`/node_modules/`,
          loaders: ['react-hot-loader', 'ts-loader']
        }
      ]
    },
    plugins: [
      lit`new webpack.optimize.OccurrenceOrderPlugin()`,
      lit`new webpack.NoErrorsPlugin()`,
      lit`FailPlugin`,
      lit`new HtmlWebpackPlugin({
      template: conf.path.client('index.html')
    })`,
      lit`new webpack.HotModuleReplacementPlugin()`,
      lit`new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })`,
      lit`new webpack.LoaderOptionsPlugin({
      options: {
        postcss: () => [autoprefixer],
        resolve: {},
        ts: {
          configFileName: 'tsconfig.json'
        },
        tslint: {
          configuration: require('../tslint.json')
        }
      },
      debug: true
    })`
    ],
    devtool: 'source-map',
    output: {
      path: lit`path.join(process.cwd(), conf.paths.tmp)`,
      filename: 'index.js'
    },
    resolve: {
      extensions: ['.webpack.js', '.web.js', '.js', '.ts', '.tsx']
    },
    entry: [
      'webpack/hot/dev-server',
      'webpack-hot-middleware/client',
      lit`\`./\${conf.path.client('index')}\``
    ]
  }]);
  const result = webpackConf(options);
  t.deepEqual(result, expected);
});

test('conf with react/css/babel', t => {
  const options = {
    test: true,
    dist: false,
    client: 'react',
    css: 'css',
    js: 'babel'
  };
  const expected = merge([{}, conf, {
    module: {
      loaders: [
        {
          test: lit`/.js$/`,
          exclude: lit`/node_modules/`,
          loader: 'eslint-loader',
          enforce: 'pre'
        },
        {
          test: lit`/\\.js$/`,
          exclude: lit`/node_modules/`,
          loaders: ['babel-loader']
        }
      ]
    },
    plugins: [
      lit`new webpack.LoaderOptionsPlugin({
      options: {},
      debug: true
    })`
    ],
    devtool: 'source-map',
    externals: {
      'react/lib/ExecutionEnvironment': 'true',
      'react/lib/ReactContext': 'true'
    }
  }]);
  const result = webpackConf(options);
  t.deepEqual(result, expected);
});

test('conf with angular2/css/js', t => {
  const options = {
    test: false,
    dist: true,
    client: 'angular2',
    css: 'css',
    js: 'js'
  };
  const expected = merge([{}, conf, {
    module: {
      loaders: [
        {test: lit`/\.(woff|woff2)$/`, loader: 'url-loader?limit=10000&mimetype=application/font-woff'},
        {test: lit`/\.ttf$/`, loader: 'file-loader'},
        {test: lit`/\.eot$/`, loader: 'file-loader'},
        {test: lit`/\.svg$/`, loader: 'file-loader'},
        {
          test: lit`/.js$/`,
          exclude: lit`/node_modules/`,
          loader: 'eslint-loader',
          enforce: 'pre'
        },
        {
          test: lit`/\\.css$/`,
          loaders: lit`ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: 'css-loader?minimize!postcss-loader'
        })`
        },
        {
          test: lit`/\.html$/`,
          loaders: ['html-loader']
        }
      ]
    },
    plugins: [
      lit`new webpack.optimize.OccurrenceOrderPlugin()`,
      lit`new webpack.NoErrorsPlugin()`,
      lit`FailPlugin`,
      lit`new HtmlWebpackPlugin({
      template: conf.path.client('index.html')
    })`,
      lit`new webpack.ContextReplacementPlugin(
      /angular(\\\\|\\/)core(\\\\|\\/)(esm(\\\\|\\/)client|client)(\\\\|\\/)linker/,
      conf.paths.client
    )`,
      lit`new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    })`,
      lit`new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })`,
      lit`new webpack.optimize.UglifyJsPlugin({
      output: {comments: false},
      compress: {unused: true, dead_code: true, warnings: false} // eslint-disable-line camelcase
    })`,
      lit`new ExtractTextPlugin('index-[contenthash].css')`,
      lit`new webpack.optimize.CommonsChunkPlugin({name: 'vendor'})`,
      lit`new webpack.LoaderOptionsPlugin({
      options: {
        postcss: () => [autoprefixer]
      }
    })`
    ],
    output: {
      path: lit`path.join(process.cwd(), conf.paths.dist)`,
      filename: '[name]-[hash].js'
    },
    // entry: {
    //   app: lit`\`./\${conf.path.src('index')}\``,
    //   vendor: lit`Object.keys(pkg.dependencies).filter(dep => ['zone.js'].indexOf(dep) === -1)`
    // }
    entry: lit`\`./\${conf.path.client('index')}\``
  }]);
  const result = webpackConf(options);
  t.deepEqual(result, expected);
});
