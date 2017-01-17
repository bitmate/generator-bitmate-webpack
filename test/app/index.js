const spies = require('chai-spies');
const chai = require('chai');
const should = chai.should(); // eslint-disable-line no-unused-vars
chai.use(spies);
const expect = chai.expect;
const _ = require('lodash');
const test = require('ava');
const Utils = require('bitmate-generator').TestUtils;

let context;

test.before(() => {
  context = Utils.mock('app');
  require('../../generators/app/index');
  process.chdir('../../');
});

test.beforeEach(() => {
  context.mergeJson['package.json'] = null;
});

const pkg = {
  devDependencies: {
    'webpack': '2.1.0-beta.27',
    'html-webpack-plugin': '^2.9.0',
    'style-loader': '^0.13.0',
    'css-loader': '^0.23.1',
    'file-loader': '^0.9.0',
    'url-loader': '^0.5.7',
    'postcss-loader': '^0.8.0',
    'autoprefixer': '^6.2.2',
    'json-loader': '^0.5.4',
    'extract-text-webpack-plugin': '^2.0.0-beta.3',
    'webpack-fail-plugin': '^1.0.5'
  }
};

test('Configuring package.json with react/babel/css', t => {
  const expected = _.merge({}, pkg, {
    devDependencies: {
      'webpack-dev-middleware': '^1.4.0',
      'webpack-hot-middleware': '^2.6.0',
      'react-hot-loader': '^1.3.0'
    }
  });
  Utils.call(context, 'configuring.package', {client: 'react', js: 'babel', css: 'css'});
  t.deepEqual(context.mergeJson['package.json'], expected);
});

test('Configuring package.json with react/babel/less', t => {
  const expected = _.merge({}, pkg, {
    devDependencies: {
      'webpack-dev-middleware': '^1.4.0',
      'webpack-hot-middleware': '^2.6.0',
      'react-hot-loader': '^1.3.0',
      'less-loader': '^2.2.2',
      'less': '^2.3.1'
    }
  });
  Utils.call(context, 'configuring.package', {client: 'react', js: 'babel', css: 'less'});
  t.deepEqual(context.mergeJson['package.json'], expected);
});

test('Configuring package.json with react/babel/sass', t => {
  const expected = _.merge({}, pkg, {
    devDependencies: {
      'webpack-dev-middleware': '^1.4.0',
      'webpack-hot-middleware': '^2.6.0',
      'react-hot-loader': '^1.3.0',
      'sass-loader': '^3.1.2',
      'node-sass': '^3.4.2'
    }
  });
  Utils.call(context, 'configuring.package', {client: 'react', js: 'babel', css: 'scss'});
  t.deepEqual(context.mergeJson['package.json'], expected);
});

test('Configuring package.json with react/babel/styl', t => {
  const expected = _.merge({}, pkg, {
    devDependencies: {
      'webpack-dev-middleware': '^1.4.0',
      'webpack-hot-middleware': '^2.6.0',
      'react-hot-loader': '^1.3.0',
      'stylus-loader': '^2.1.0',
      'stylus': '^0.54.5'
    }
  });
  Utils.call(context, 'configuring.package', {client: 'react', js: 'babel', css: 'styl'});
  t.deepEqual(context.mergeJson['package.json'], expected);
});

test('Configuring package.json with angular1/babel/css', t => {
  const expected = _.merge({}, pkg, {
    devDependencies: {
      'ng-annotate-loader': '^0.0.10',
      'html-loader': '^0.4.3'
    }
  });
  Utils.call(context, 'configuring.package', {client: 'angular1', js: 'babel', css: 'css'});
  t.deepEqual(context.mergeJson['package.json'], expected);
});

test('Configuring package.json with react/typescript/css', t => {
  const expected = _.merge({}, pkg, {
    devDependencies: {
      'webpack-dev-middleware': '^1.4.0',
      'webpack-hot-middleware': '^2.6.0',
      'react-hot-loader': '^1.3.0',
      'ts-loader': '^1.2.2'
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
