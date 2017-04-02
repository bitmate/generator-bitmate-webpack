'use strict';

const lit = require('@oligibson/bitmate-generator').lit;
const json = require('@oligibson/bitmate-generator').json;

module.exports = function webpackConf(options) {
  const loaderOptionsPlugin = {
    options: {}
  };
  const conf = {
    module: {
      loaders: [
        {test: lit`/\.json$/`, loaders: ['json-loader']}
      ]
    }
  };

  if (options.client === 'angular2') {
    conf.module.loaders.push({test: lit`/tether\\.js$/`, loader: 'expose-loader?Tether'});
    conf.module.exprContextCritical = false;
  }

  if (options.test === false) {
    conf.module.loaders.push(
      {test: lit`/\.(woff|woff2)$/`, loader: 'url-loader?limit=10000&mimetype=application/font-woff'},
      {test: lit`/\.ttf$/`, loader: 'file-loader'},
      {test: lit`/\.eot$/`, loader: 'file-loader'},
      {test: lit`/\.svg$/`, loader: 'file-loader'});
  }

  if (options.js === 'typescript') {
    const test = options.client === 'react' ? lit`/\.tsx$/` : lit`/\.ts$/`;
    conf.module.loaders.push({test, exclude: lit`/node_modules/`, loader: 'tslint-loader', enforce: 'pre'});
  } else if (options.client !== 'angular1') {
    conf.module.loaders.push({test: lit`/\.js$/`, exclude: lit`/node_modules/`, loader: 'eslint-loader', enforce: 'pre'});
  }

  if (options.test === false) {
    conf.plugins = [
      lit`new webpack.optimize.OccurrenceOrderPlugin()`,
      lit`new webpack.NoErrorsPlugin()`,
      lit`FailPlugin`,
      lit`new HtmlWebpackPlugin({
      template: conf.path.client('index.html')
    })`
    ];
    loaderOptionsPlugin.options.postcss = lit`() => [autoprefixer]`;
  } else {
    conf.plugins = [];
  }

  if (options.client === 'angular2') {
    // https://github.com/angular/angular/issues/11580
    conf.plugins.push(lit`new webpack.ContextReplacementPlugin(
      /angular(\\\\|\\/)core(\\\\|\\/)(esm(\\\\|\\/)client|client)(\\\\|\\/)linker/,
      conf.paths.client
    )`);
  }

  if (options.dist === false) {
    loaderOptionsPlugin.debug = true;
    conf.devtool = 'source-map';
    if (options.test === false) {
      conf.output = {
        path: lit`path.join(process.cwd(), conf.paths.tmp)`,
        filename: 'index.js'
      };
    }
  } else {
    conf.output = {
      path: lit`path.join(process.cwd(), conf.paths.dist)`,
      filename: '[name]-[hash].js'
    };
  }

  if (options.js === 'typescript') {
    conf.resolve = {
      extensions: ['.webpack.js', '.web.js', '.js', '.ts']
    };

    if (options.client === 'react') {
      conf.resolve.extensions.push('.tsx');
      if (options.test === true) {
        conf.externals = lit`{
    'jsdom': 'window',
    'cheerio': 'window',
    'react/lib/ExecutionEnvironment': 'true',
    'react/lib/ReactContext': 'window',
    'text-encoding': 'window'
  }`;
      }
    }
  }

  if (options.test === false) {
    const index = lit`\`./\${conf.path.client('index')}\``;

    if (options.dist === false && options.client === 'react') {
      conf.entry = [
        'webpack/hot/dev-server',
        'webpack-hot-middleware/client',
        index
      ];
    } else if (options.dist === true && options.client !== 'angular2') {
      // const exceptions = [];
      const vendor = 'Object.keys(pkg.dependencies)';
      // if (options.client === 'angular2') {
      //   exceptions.push(`'zone.js'`);
      // }
      // if (exceptions.length) {
      //   vendor += `.filter(dep => [${exceptions.join(', ')}].indexOf(dep) === -1)`;
      // }
      conf.entry = {
        app: index,
        vendor: lit`${vendor}`
      };
    } else {
      conf.entry = index;
    }

    if (options.dist === false && options.client === 'react') {
      conf.plugins.push(
        lit`new webpack.HotModuleReplacementPlugin()`
      );
    }

    if (options.dist === true && options.client !== 'angular1') {
      conf.plugins.push(
        lit`new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    })`
      );
    }

    conf.plugins.push(
      lit `new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })`
    );

    if (options.dist === true) {
      conf.plugins.push(
        lit`new webpack.optimize.UglifyJsPlugin({
      output: {comments: false},
      compress: {unused: true, dead_code: true, warnings: false} // eslint-disable-line camelcase
    })`,
        lit`new ExtractTextPlugin('index-[contenthash].css')`,
        lit`new webpack.optimize.CommonsChunkPlugin({name: 'vendor'})`
      );
    }
  }

  if (options.test === false) {
    let cssLoaders;
    let test = lit`/\\.css$/`;
    const mapToLoaders = {
      scss: '!sass-loader',
      less: '!less-loader',
      styl: '!stylus-loader'
    };

    if (options.dist === true) {
      if (options.css === 'scss') {
        test = lit`/\\.(css|scss)$/`;
      }
      if (options.css === 'less') {
        test = lit`/\\.(css|less)$/`;
      }
      if (options.css === 'styl') {
        test = lit`/\\.(css|styl|stylus)$/`;
      }
      cssLoaders = lit`ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader${mapToLoaders[options.css]}!postcss-loader'
        })`;
    } else {
      cssLoaders = ['style-loader', 'css-loader'];
      if (options.css === 'scss') {
        cssLoaders.push('sass-loader');
        test = lit`/\\.(css|scss)$/`;
      }
      if (options.css === 'less') {
        cssLoaders.push('less-loader');
        test = lit`/\\.(css|less)$/`;
      }
      if (options.css === 'styl') {
        cssLoaders.push('stylus-loader');
        test = lit`/\\.(css|styl|stylus)$/`;
      }
      cssLoaders.push('postcss-loader');
    }

    conf.module.loaders.push({test, loaders: cssLoaders});
  }

  const jsLoaders = [];
  if (options.test === false && options.dist === false && options.client === 'react') {
    jsLoaders.push('react-hot-loader');
  }
  if (options.client === 'angular1') {
    jsLoaders.push('ng-annotate-loader');
  }
  if (options.js === 'babel' || options.js === 'js' && options.client === 'react') {
    jsLoaders.push('babel-loader');
  }
  if (options.js === 'typescript') {
    jsLoaders.push('ts-loader');
  }
  if (jsLoaders.length > 0) {
    const jsLoader = {test: lit`/\\.js$/`, exclude: lit`/node_modules/`, loaders: jsLoaders};

    if (options.js === 'typescript') {
      jsLoader.test = lit`/\\.ts$/`;
      if (options.client === 'react') {
        jsLoader.test = lit`/\\.tsx$/`;
      }
    }

    conf.module.loaders.push(jsLoader);
  }
  if (options.client !== 'react' && options.client !== 'vue') {
    const htmlLoader = {
      test: lit`/\.html$/`,
      loaders: ['html-loader']
    };
    conf.module.loaders.push(htmlLoader);
  }

  if (options.js === 'typescript') {
    loaderOptionsPlugin.options.resolve = {};
    loaderOptionsPlugin.options = Object.assign(loaderOptionsPlugin.options, {
      resolve: {},
      ts: {
        configFileName: 'tsconfig.json'
      },
      tslint: {
        configuration: lit`require('../tslint.json')`
      }
    });
  }

  conf.plugins.push(lit`new webpack.LoaderOptionsPlugin(${json(loaderOptionsPlugin, 4)})`);

  if (options.test === true && options.js !== 'typescript') {
    if (options.client === 'react') {
      conf.externals = {
        'react/lib/ExecutionEnvironment': 'true',
        'react/lib/ReactContext': 'true'
      };
    }
  }

  return conf;
};
