var gulp = require('gulp');
var watch = require('gulp-watch');
var jshint = require('gulp-jshint');
var jshintReporter = require('jshint-stylish');
var autoprefixer = require('gulp-autoprefixer');
var shell = require('gulp-shell');
var path = require('path');
var $ = require('gulp-load-plugins')();
var sass = require('gulp-sass');

var environment = $.util.env.type || 'development';
var isProduction = environment === 'production';
var webpackConfig = require('./webpack.config.js')[environment];

var dir = 'public/';

var paths = {
	'server': ['./models/**/*.js','./routes/**/*.js', 'keystone.js', 'package.json'],
	'client': ['./public/**/*.js', '!./public/js/bundle.js', '!./public/js/app/helpers/**'],
	'style': {
		all: './public/styles/**/*.scss',
		output: './public/styles/'
	}
};

// gulp lint
gulp.task('lint:client', function(){
	gulp.src(paths.client)
		.pipe(jshint({
			esnext: true
		}))
		.pipe(jshint.reporter(jshintReporter));
});

// gulp watcher for lint
gulp.task('watch:lint:client', function () {
	gulp.src(paths.client)
		.pipe(watch())
		.pipe(jshint({
			esnext: true
		}))
		.pipe(jshint.reporter(jshintReporter));
});


// gulp lint
gulp.task('lint:server', function(){
	gulp.src(paths.server)
		.pipe(jshint())
		.pipe(jshint.reporter(jshintReporter));
});

// gulp watcher for lint
gulp.task('watch:lint:server', function () {
	gulp.src(paths.server)
		.pipe(watch())
		.pipe(jshint())
		.pipe(jshint.reporter(jshintReporter));
});

gulp.task('scripts', function() {
  return gulp.src(webpackConfig.entry)
    .pipe($.webpack(webpackConfig))
    .pipe(isProduction ? $.uglifyjs() : $.util.noop())
    .pipe(gulp.dest(dir + 'js/'))
    .pipe($.size({ title : 'js' }))
    .pipe($.connect.reload());
});

gulp.task('watch:scripts', function() {
  gulp.watch(paths.client, ['scripts']);
});

gulp.task('sass', function(){
	gulp.src(paths.style.all)
		.pipe(isProduction ? $.uglifyjs() : $.util.noop())
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(gulp.dest(paths.style.output));
});

gulp.task('watch:sass', function () {
	gulp.watch(paths.style.all, ['sass']);
});

gulp.task('runKeystone', shell.task('node keystone.js'));

gulp.task('watch:jshint', [
	'watch:lint:server',
	'watch:lint:client'
]);

gulp.task('watch', [
  'watch:scripts',
	'watch:sass',
	'watch:jshint'
]);

gulp.task('build', [
	'scripts',
	'sass'
]);

gulp.task('default', ['build',  'watch', 'runKeystone']);
