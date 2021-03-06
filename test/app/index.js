/* eslint quote-props: 0 */  // --> OFF

const path = require('path');
const spies = require('chai-spies');
const chai = require('chai');
const should = chai.should(); // eslint-disable-line no-unused-vars
chai.use(spies);
const expect = chai.expect;
const _ = require('lodash');
const test = require('ava');
const Utils = require('@oligibson/bitmate-generator').TestUtils;

let context;

test.before(() => {
  context = Utils.mock('app');
  require('../../generators/app/index');
  process.chdir(path.resolve(__dirname, '../../'));
});

test.beforeEach(() => {
  context.mergeJson['package.json'] = null;
});

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

test('Configuring package.json with react/babel/css', t => {
  const expected = _.merge({}, pkg, {
    devDependencies: {
      'webpack-dev-middleware': '1.10.1',
      'webpack-hot-middleware': '2.18.0',
      'react-hot-loader': '1.3.1'
    }
  });
  Utils.call(context, 'configuring.package', {client: 'react', js: 'babel', css: 'css'});
  t.deepEqual(context.mergeJson['package.json'], expected);
});

test('Configuring package.json with react/babel/less', t => {
  const expected = _.merge({}, pkg, {
    devDependencies: {
      'webpack-dev-middleware': '1.10.1',
      'webpack-hot-middleware': '2.18.0',
      'react-hot-loader': '1.3.1',
      'less-loader': '2.2.3',
      'less': '2.7.2'
    }
  });
  Utils.call(context, 'configuring.package', {client: 'react', js: 'babel', css: 'less'});
  t.deepEqual(context.mergeJson['package.json'], expected);
});

test('Configuring package.json with react/babel/sass', t => {
  const expected = _.merge({}, pkg, {
    devDependencies: {
      'webpack-dev-middleware': '1.10.1',
      'webpack-hot-middleware': '2.18.0',
      'react-hot-loader': '1.3.1',
      'sass-loader': '6.0.3',
      'node-sass': '4.5.2'
    }
  });
  Utils.call(context, 'configuring.package', {client: 'react', js: 'babel', css: 'scss'});
  t.deepEqual(context.mergeJson['package.json'], expected);
});

test('Configuring package.json with react/babel/styl', t => {
  const expected = _.merge({}, pkg, {
    devDependencies: {
      'webpack-dev-middleware': '1.10.1',
      'webpack-hot-middleware': '2.18.0',
      'react-hot-loader': '1.3.1',
      'stylus-loader': '^2.5.0',
      'stylus': '^0.54.5'
    }
  });
  Utils.call(context, 'configuring.package', {client: 'react', js: 'babel', css: 'styl'});
  t.deepEqual(context.mergeJson['package.json'], expected);
});

test('Configuring package.json with angular1/babel/css', t => {
  const expected = _.merge({}, pkg, {
    devDependencies: {
      'ng-annotate-loader': '0.2.0',
      'html-loader': '0.4.5'
    }
  });
  Utils.call(context, 'configuring.package', {client: 'angular1', js: 'babel', css: 'css'});
  t.deepEqual(context.mergeJson['package.json'], expected);
});

test('Configuring package.json with angular2/babel/css', t => {
  const expected = _.merge({}, pkg, {
    devDependencies: {
      'html-loader': '0.4.5',
      'expose-loader': '0.7.3'
    }
  });
  Utils.call(context, 'configuring.package', {client: 'angular2', js: 'babel', css: 'css'});
  t.deepEqual(context.mergeJson['package.json'], expected);
});

test('Configuring package.json with react/typescript/css', t => {
  const expected = _.merge({}, pkg, {
    devDependencies: {
      'webpack-dev-middleware': '1.10.1',
      'webpack-hot-middleware': '2.18.0',
      'react-hot-loader': '1.3.1',
      'ts-loader': '^2.0.0'
    }
  });
  Utils.call(context, 'configuring.package', {client: 'react', js: 'typescript', css: 'css'});
  t.deepEqual(context.mergeJson['package.json'], expected);
});

test('Copy webpack conf with correct options', t => {
  context.copyTemplate = (a, b, opts) => {
    context.copyTemplate[b] = _.clone(opts);
  };
  const spy = chai.spy.on(context, 'copyTemplate');
  const base = {client: 'angular2', js: 'babel', css: 'styl', modules: 'webpack', router: 'router'};
  Utils.call(context, 'configuring.conf', base);
  expect(spy).to.have.been.called.exactly(3);
  t.is(context.copyTemplate['conf/webpack.conf.js'].test, false);
  t.is(context.copyTemplate['conf/webpack.conf.js'].dist, false);
  t.is(context.copyTemplate['conf/webpack-test.conf.js'].test, true);
  t.is(context.copyTemplate['conf/webpack-test.conf.js'].dist, false);
  t.is(context.copyTemplate['conf/webpack-dist.conf.js'].test, false);
  t.is(context.copyTemplate['conf/webpack-dist.conf.js'].dist, true);
});

test('gulp(): call this.fs.copyTpl', () => {
  context.templatePath = context.destinationPath = path => path;
  context.fs = {
    copyTpl: () => {}
  };
  const spy = chai.spy.on(context.fs, 'copyTpl');
  Utils.call(context, 'writing.gulp');
  expect(spy).to.have.been.called.once();
});
