"use strict";

var gulp = require('gulp');
var pug = require('gulp-pug');
var autoprefixer = require("autoprefixer");
var browserSync = require("browser-sync").create();
var imagemin = require("gulp-imagemin");
var webp = require("gulp-webp");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var sass = require('gulp-sass');
var csso = require("gulp-csso");
var rename = require("gulp-rename");
var del = require("del");
var svgstore = require("gulp-svgstore");
var sourcemap = require("gulp-sourcemaps");

gulp.task("clean", function () {
  return del("build")
});

gulp.task('pug', function () {
  return gulp.src('source/pug/pages/*.pug')
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('build'))
    .on('end', browserSync.reload)
});

gulp.task('style', function (){
  return gulp.src('source/sass/main.scss')
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task("image", function () {
  return gulp.src("source/img/**/*.{png,jpg,svg,gif}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("build/img"))
});

gulp.task("webp", function () {
  return gulp.src("source/img/**/*.{png,jpg}")
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest("build/img/"))
});

gulp.task("sprite", function () {
  return gulp.src("source/img/icons/*.svg")
    .pipe(svgstore({
      inlineSVG: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img/icons"))
});

gulp.task("copyJs", function () {
  return gulp.src([
    "source/js/**/*.js",
  ], {
    base: "source"
  })
    .pipe(gulp.dest("build/"))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task("copyImg", function () {
  return gulp.src([
    "source/img/**/**",
  ], {
    base: "source"
  })
    .pipe(gulp.dest("build/"))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task("copyFonts", function () {
  return gulp.src([
    "source/fonts/**/**",
  ], {
    base: "source"
  })
    .pipe(gulp.dest("build/"))
});

gulp.task("watch", function () {
  gulp.watch("source/**/*.{scss,sass}", gulp.series("style"));
  gulp.watch("source/pug/**/*.pug", gulp.series("pug"));
  gulp.watch("source/img/icons/*.svg", gulp.series("sprite"));
  gulp.watch("source/img/**/*.{png,jpg,svg}", gulp.series("copyImg"));
  gulp.watch("source/js/**/*.js", gulp.series("copyJs"));
  gulp.watch("source/fonts/**/**", gulp.series("copyFonts"));
});

gulp.task("server", function () {
  browserSync.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });
});

gulp.task("build", gulp.series("clean",'pug', 'style', "image", "webp", "copyJs", "copyFonts", "sprite"));

gulp.task("start", gulp.series("clean",'pug', 'style', "copyImg", "copyJs", "copyFonts", "sprite"));

gulp.task('default', gulp.series(
  gulp.parallel('start'),
  gulp.parallel('watch', 'server'),
));
