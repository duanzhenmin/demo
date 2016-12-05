/**
 * (c) Copyright 2016 duanzhenmin. All Rights Reserved.
 */ 

var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	imagemin = require('gulp-imagemin'),
	htmlmin = require('gulp-htmlmin'),
	cssmin = require('gulp-clean-css'),
	cssspriter = require('gulp-css-spriter'),
	spriter = require('gulp.spritesmith'),
	autoprefixer = require('gulp-autoprefixer');

gulp.task("htmlmin", function() {
	gulp.src("pc-download/演示.html")
		.pipe(htmlmin({
			removeComments: true, //清除HTML注释
			collapseWhitespace: true, //压缩HTML
			collapseBooleanAttributes: true, //省略布尔属性的值 <input checked="true"/> ==> <input />
			removeEmptyAttributes: true, //删除所有空格作属性值 <input id="" /> ==> <input />
			removeScriptTypeAttributes: true, //删除<script>的type="text/javascript"
			removeStyleLinkTypeAttributes: true, //删除<style>和<link>的type="text/css"
			minifyJS: true, //压缩页面JS
			minifyCSS: true //压缩页面CSS
		}))
		.pipe(gulp.dest("dis/pc-download"))
});

gulp.task("jsmin", function() {
	gulp.src("pc-download/js/*.js")
		.pipe(uglify())
		.pipe(rename({
			suffix: ".min"
		}))
		.pipe(gulp.dest("dis/pc-download/js"));
});

gulp.task("autoaddcss", function() {
	gulp.src("pc-download/css/index.css")
		.pipe(autoprefixer({
			browsers: ['Firefox >= 20'],
			cascade: true,
			remove: false
		}))
		.pipe(rename({
			suffix: ".add"
		}))
		.pipe(gulp.dest("dis/pc-download/css"));
});

gulp.task('imgmin', function() {
	gulp.src('pc-download/images/*.{png,jpg,gif,ico,svg}')
		.pipe(imagemin({
			optimizationLevel: 5,
			progressive: true,
			interlaced: true,
			multipass: true
		}))
		.pipe(gulp.dest('dis/pc-download/img'));
});

gulp.task('css', function() {
	return gulp.src('./cxdz/css/customization.css') //生成雪碧图的样式文件
		.pipe(cssspriter({
			'spriteSheet': './cxdz/images/sprite.png', //生成的spriter的位置
			'pathToSpriteSheetFromCSS': '../images/sprite.png' //生成样式css文件中图片的路径
		}))
		.pipe(gulp.dest('./cxdz/css/'))
});

gulp.task('default', function() {
	return gulp.src('cxdz/images/*.png')
		.pipe(spriter({
			imgName: 'cxdz/images/spriter1.png',
			cssName: 'cxdz/css/spriter.css',
			padding: 5,
			algorithm: 'binary-tree',
			cssTemplate: 'cxdz/css/model.css'
		}))
		.pipe(gulp.dest('dis/css/'));
});

gulp.task("watch1", function() {
	gulp.watch("pc-download/js/*.js", ['jsmin']);
});