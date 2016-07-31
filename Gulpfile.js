'use strict'
const gulp = require('gulp')
const stylus = require('gulp-stylus')
const data = require('gulp-data')
const livereload = require('gulp-livereload')
const uglify = require('gulp-uglify')

const buffer = require('vinyl-buffer')
const source = require('vinyl-source-stream')
const environments = require('gulp-environments')

const browserify = require('browserify')
const babelify = require('babelify')
const watchify = require('watchify')
const assign = require('lodash.assign')

const development = environments.development
const production = environments.production

let opts = {
  entries: './src/react/app.js',
  transform: [ babelify ],
  debug: true
}

opts = assign({}, watchify.args, opts)

// Task's Templates
gulp.task('template', () => template())
gulp.task('template:live', () => template().pipe(livereload({ start: true })))
gulp.task('template:watch', () => gulp.watch('./src/*.html', ['template:live']))

// Task's Stylus
gulp.task('styl', () => styl())
gulp.task('styl:live', () => styl().pipe(livereload({ start: true })))
gulp.task('styl:watch', () => {
  return gulp.watch(['./src/stylus/*.styl','./src/stylus/*.styl'], ['styl:live'])
})

// Task's React files
gulp.task('react', () => rebundle(browserify(opts)))
gulp.task('react:watch', () => {
  let w = watchify(browserify(opts))

  w.on('update', () => {
    console.log('--> File modified, rebuilding...')

    let bundle = rebundle(w).pipe(livereload())
    console.log('--> Rebuild finished')
    return bundle
  })

  return rebundle(w).pipe(livereload({ start: true }))
})

gulp.task('default', ['styl', 'template', 'react'])
gulp.task('watch', ['default', 'watching'])

gulp.task('watching', ['styl:watch', 'template:watch', 'react:watch'])

function rebundle (b) {
  return b
    .bundle()
    .on('error', function(err) { console.error(err); this.emit('end'); })
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(production(uglify()))
    .pipe(gulp.dest('./public/js'))
}

function styl () {
  return gulp.src('./src/stylus/style.styl')
    .pipe(stylus({ compress: true }))
    .pipe(gulp.dest('./public/css'))
}

function template () {
  return gulp.src('./src/*.html')
    .pipe(gulp.dest('./public'))
}