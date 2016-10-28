
//
// 'use strict';
// var gulp = require('gulp');
// var concat = require('gulp-concat');
// // var uglify = require('gulp-uglify');
//
// // gulp.task("script",function(){
// // 	gulp.src(['./*.js','!./node_modules/**/*.js','!./gulpfile.js'])
//
// // 	.pipe(concat("routerAndCtrl.js"))
// // 	// .pipe(uglify())
// // 	.pipe(gulp.dest("../dist"));
// // 	// .pipe(gulp.dest("./js"));
// // });
//
//
// gulp.task("script",function(){
// 	gulp.src(['../js/app.js','../js/billDetails.js','../js/billList.js',
// 		'../js/doctorList.js','../js/home_page.js','!./gulpfile.js'])
//
// 	.pipe(concat("routerAndCtrl.js"))
//
// 	.pipe(gulp.dest("../dist"));
//
// });





// 'use strict';
// var gulp = require('gulp');
// var concat = require('gulp-concat');
// var uglify = require('gulp-uglify');
// gulp.task("script",function(){
//     gulp.src(['../js/app.js',
//         '../js/login.js',
//         '../js/homePage.js',
//         '../js/doctorList.js',
//         '../js/editBD.js',
//         '../js/billList.js',
//         '../js/billDetails.js',
//         '../js/service.js',
//         '!./gulpfile.js'])
//         .pipe(concat("IdoctorManagement.js"))
//         .pipe(uglify())
//         .pipe(gulp.dest("../js"));
//
// });


//压缩css
//var gulp = require('gulp'),
//minifycss = require('gulp-minify-css'),
//concat = require('gulp-concat'),
//uglify = require('gulp-uglify'),
//rename = require('gulp-rename');
//
//gulp.task('minifycss', function() {
//    return gulp.src('../css/all.css')    //需要操作的文件
//        .pipe(rename({suffix: '.min'}))   //rename压缩后的文件名
//        .pipe(minifycss())   //执行压缩
//        .pipe(gulp.dest('../css'));   //输出文件夹
//});







