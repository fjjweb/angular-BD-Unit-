

'use strict';
var gulp = require('gulp');
var concat = require('gulp-concat');
// var uglify = require('gulp-uglify');

// gulp.task("script",function(){
// 	gulp.src(['./*.js','!./node_modules/**/*.js','!./gulpfile.js'])

// 	.pipe(concat("routerAndCtrl.js"))
// 	// .pipe(uglify())
// 	.pipe(gulp.dest("../dist"));
// 	// .pipe(gulp.dest("./js"));
// });

//
//gulp.task("script",function(){
//	gulp.src(['../js/app.js','../js/home_page.js','../js/doctorList.js',
//		'../js/billList.js',
//		'../js/editBD.js',
//		'../js/billDetails.js',
//		'../js/login.js',
//		'../js/service.js',
//		'!./gulpfile.js'])
//	.pipe(concat("routerAndCtrl.js"))
//	.pipe(gulp.dest("../dist"));
//});


var gulp = require('gulp'),
	imagemin = require('gulp-imagemin'),
//确保本地已安装imagemin-pngquant [cnpm install imagemin-pngquant --save-dev]
	pngquant = require('imagemin-pngquant');

gulp.task('testImagemin', function () {
	gulp.src('src/img/*.{png,jpg,gif,ico}')
		.pipe(imagemin({
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],//不要移除svg的viewbox属性
			use: [pngquant()] //使用pngquant深度压缩png图片的imagemin插件
		}))
		.pipe(gulp.dest('dist/img'));
});