'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var uglify = require('gulp-uglify');
var livereload = require('gulp-livereload');
var notify = require("gulp-notify");
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var babelify = require('babelify');
var es2015 = require('babel-preset-es2015');
var babelReact = require('babel-preset-react');
var react = require('react');


	livereload({ start: true }); // start 'livereload'
	// With livereload you must:
	// 1) install gulp-livereload
    // 2) Install livereload chrome app
    // 3) Start livereload [as seen above]
    // 4) add livereload pipe to the end of the tasks you want to activate it
    // 5) add livereload listener to gulp watch 


    // ..........................................................

    // gulp-sass 

    // ..........................................................

	
	gulp.task('sass', function () {
	    gulp.src('dev/sass/**/*.scss')
	    .pipe(sass().on('error', sass.logError))
	    .pipe(gulp.dest('app/css'))
	    .pipe(livereload());
    });


    // ..........................................................

    // Browserify, along with bablify, babel-preset-react, babel-preset-es2015

    // ..........................................................
      

        gulp.task('babelify', function() {
		    browserify({
		     	entries: [
		     	'./dev/js/main.js'
		     	], 
		     	extensions: ['.js'], 
		     	debug: true
		    })
	        .transform(babelify, {presets: ['babel-preset-es2015', 'react']}, { compact: false })
	        .bundle()
	        .on('error', function(err) {
             return notify().write(err);
             })
	        .pipe(source('bundle.js'))
	        .pipe(gulp.dest('app/js'))
	        .pipe(livereload());
		});
	

	// ..........................................................

    // Js-tasks : incl/ ugligfy, browserify, babel 

    // ..........................................................
    

    // gulp.task('scripts', function(){
    //    gulp.src('js/*.js')
    //    .pipe(uglify())
    //    .pipe(gulp.dest('build/js'))
    //    .pipe(livereload());
   // });


    // ..........................................................

    // gulp-watch

    // ..........................................................


	gulp.task('watch', function(){
		//livereload.listen(); // Livereload listener
        gulp.watch([
        	'dev/sass/**/*.scss', 
        	'dev/js/**/*.js'], ['sass', 'babelify']);
	});


	// ..........................................................

    // default task

    // ..........................................................
	
	gulp.task('default', function() {


    });
    // Note: you can run default tasks by passing an array as the second argument instead of a callback (as used)
    // LIKE SO: gulp.task('default', ['watch', 'another task', 'one more', 'and so on']);