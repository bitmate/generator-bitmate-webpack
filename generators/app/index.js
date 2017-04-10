/* eslint quote-props: 0 */  // --> OFF

const bitmate = require('@oligibson/bitmate-generator');
const webpackConf = require('./conf');

module.exports = bitmate.Base.extend({
  configuring: {
    package() {
      const pkg = {
        devDependencies: {
          'webpack': '2.3.3',
          'html-webpack-plugin': '2.28.0',
          'style-loader': '0.13.2',
          'css-loader': '0.26.4',
          'file-loader': '0.11.1',
          'postcss-loader': '1.3.3',
          'url-loader': '0.5.8',
          'autoprefixer': '6.7.7',
          'json-loader': '0.5.4',
          'extract-text-webpack-plugin': '^2.0.0-rc.3'
        }
      };

      if (this.options.client === 'react') {
        Object.assign(pkg.devDependencies, {
          'webpack-dev-middleware': '1.10.1',
          'webpack-hot-middleware': '2.18.0',
          'react-hot-loader': '1.3.1'
        });
      }

      if (this.options.client === 'angular1') {
        Object.assign(pkg.devDependencies, {
          'ng-annotate-loader': '0.2.0'
        });
      }

      if (this.options.client !== 'react' && this.options.client !== 'vue') {
        Object.assign(pkg.devDependencies, {
          'html-loader': '0.4.5'
        });
      }

      if (this.options.js === 'typescript') {
        Object.assign(pkg.devDependencies, {
          'ts-loader': '^2.0.0'
        });
      }

      if (this.options.css === 'scss') {
        Object.assign(pkg.devDependencies, {
          'sass-loader': '6.0.3',
          'node-sass': '4.5.2'
        });
      }

      if (this.options.css === 'less') {
        Object.assign(pkg.devDependencies, {
          'less-loader': '2.2.3',
          'less': '2.7.2'
        });
      }

      if (this.options.css === 'styl') {
        Object.assign(pkg.devDependencies, {
          'stylus-loader': '^2.5.0',
          'stylus': '^0.54.5'
        });
      }

      if (this.options.client === 'angular2') {
        Object.assign(pkg.devDependencies, {
          'expose-loader': '0.7.3'
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
