const bitmate = require('bitmate-generator');
const webpackConf = require('./conf');

module.exports = bitmate.Base.extend({
  configuring: {
    package() {
      const pkg = {
        devDependencies: {
          'webpack': '2.1.0-beta.27',
          'html-webpack-plugin': '^2.9.0',
          'style-loader': '^0.13.0',
          'css-loader': '^0.23.1',
          'file-loader': '^0.9.0',
          'postcss-loader': '^0.8.0',
          'url-loader': '^0.5.7',
          'autoprefixer': '^6.2.2',
          'json-loader': '^0.5.4',
          'extract-text-webpack-plugin': '^2.0.0-beta.3',
          'webpack-fail-plugin': '^1.0.5'
        }
      };

      if (this.options.client === 'react') {
        Object.assign(pkg.devDependencies, {
          'webpack-dev-middleware': '^1.4.0',
          'webpack-hot-middleware': '^2.6.0',
          'react-hot-loader': '^1.3.0'
        });
      }

      if (this.options.client === 'angular1') {
        Object.assign(pkg.devDependencies, {
          'ng-annotate-loader': '^0.0.10'
        });
      }

      if (this.options.client !== 'react' && this.options.client !== 'vue') {
        Object.assign(pkg.devDependencies, {
          'html-loader': '^0.4.3'
        });
      }

      if (this.options.js === 'typescript') {
        Object.assign(pkg.devDependencies, {
          'ts-loader': '^1.2.2'
        });
      }

      if (this.options.css === 'scss') {
        Object.assign(pkg.devDependencies, {
          'sass-loader': '^3.1.2',
          'node-sass': '^3.4.2'
        });
      }

      if (this.options.css === 'less') {
        Object.assign(pkg.devDependencies, {
          'less-loader': '^2.2.2',
          'less': '^2.3.1'
        });
      }

      if (this.options.css === 'styl') {
        Object.assign(pkg.devDependencies, {
          'stylus-loader': '^2.1.0',
          'stylus': '^0.54.5'
        });
      }

      if (this.options.client === 'angular2') {
        Object.assign(pkg.devDependencies, {
          'expose-loader': '^0.7.3'
        });
      }

      this.mergeJson('package.json', pkg);
    },

    conf() {
      const options = Object.assign({}, this.options, {
        dist: false,
        test: false
      });

      options.webpackConf = webpackConf(options);

      this.copyTemplate('conf/webpack.conf.js', 'conf/webpack.conf.js', options);

      options.test = true;
      options.webpackConf = webpackConf(options);

      this.copyTemplate('conf/webpack.conf.js', 'conf/webpack-test.conf.js', options);

      options.test = false;
      options.dist = true;
      options.webpackConf = webpackConf(options);

      this.copyTemplate('conf/webpack.conf.js', 'conf/webpack-dist.conf.js', options);
    }
  },

  writing: {
    gulp() {
      this.fs.copyTpl(
        this.templatePath('gulp_tasks'),
        this.destinationPath('gulp_tasks'),
        this.options
      );
    }
  }
});
