var gulp = require('gulp');

var sass = require('gulp-sass');

var htmlmin = require('gulp-htmlmin');

var sourcemaps = require('gulp-sourcemaps');

var replace = require('gulp-replace');

var gutil = require('gulp-util');

var date=new Date();

var year=date.getFullYear();

var month=date.getMonth()+1;

var theDate=date.getDate();

var hours=date.getHours();

var minutes=date.getMinutes();

var seconds=date.getSeconds();

var dataString=[
	year,
	month > 10 ? month :'0'+ month,
	theDate > 10 ? theDate :'0'+theDate,
	hours > 10 ? hours : '0'+hours,
	minutes > 10 ? minutes : '0'+minutes,
	seconds > 10 ? seconds : '0'+seconds
].join('');

if (process.env.NODE_ENV == 'production') {

	gulp.task('ejs', function () {
		return gulp.src('./templates/**/*.ejs')
			.pipe(htmlmin({collapseWhitespace: true}))
			.pipe(replace(/\.css\b/g, '.css?v=' + dataString))
			.pipe(replace(/\.js\b/g, '.js?v=' + dataString))
			.pipe(replace(/\.png\b/g, '.png?v=' + dataString))
			.pipe(gulp.dest('./views/'))

	})
}

gulp.task('sass', function () {
	return gulp.src('./sass/**/*.scss')
		.pipe(sourcemaps.init())
	  .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(sourcemaps.write('/'))
		.pipe(replace(/\.png\b/g, '.png?v=' + dataString))
		.pipe(gulp.dest('./public/styles'))
})

gulp.task('sass:watch', function () {
	gulp.watch('./sass/**/*.scss', ['sass']);
})

gulp.task('ejs:watch', function () {
	gulp.watch('./templates/**/*.ejs', ['ejs']);
})

gulp.task('default', ['sass:watch','ejs:watch']);
