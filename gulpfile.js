/**
 * 1.less编译  压缩  合并
 * 2.js合并  压缩  混淆
 * 3.img复制
 * 4.html压缩
 */

/*1.less编译  压缩  合并*/	// 合并没有必要，一般预处理css都会自动导包
var gulp = require('gulp');
var less = require('gulp-less');
var cssnano = require('gulp-cssnano');

gulp.task('style', function() {
	gulp.src('src/less/*.less')
	.pipe(less())	// 编译
	.pipe(cssnano())  // 压缩
	.pipe(gulp.dest('dist/css/'))
	.pipe(browserSync.reload({
		stream: true
	}));
});

/*2.js合并  压缩  混淆*/
var concat = require('gulp-concat');	// 合并
var uglify = require('gulp-uglify');	// 混淆

gulp.task('scripts', function() {
	gulp.src('src/scripts/*.js')
	.pipe(concat('all.js'))	// 合并必须自取一个名字
	.pipe(uglify())
	.pipe(gulp.dest('dist/js/'))
	.pipe(browserSync.reload({	// 自动更新
		stream: true
	}));
});

/*3.img复制*/
gulp.task('image', function() {
	gulp.src('src/images/*.*')
	.pipe(gulp.dest('dist/images/'))
	.pipe(browserSync.reload({
		stream: true
	}));
});

/*4.html压缩*/
var htmlmin = require('gulp-htmlmin');	// 压缩html 出现了问题
gulp.task('html', function() {
	gulp.src('src/*.html')
	.pipe(htmlmin({collapseWhitespace: true}))
	.pipe(gulp.dest('dist'))
	.pipe(browserSync.reload({
		stream: true
	}));
});

/*serve服务*/
/*browser-sync*/
var browserSync = require('browser-sync');
gulp.task('serve', function() {
	browserSync({
		server: {
			baseDir : ['dist']
		}}, function(err, bs) {
		console.log(bs.options.getIn(["urls", "local"]));
	});
});

/*监听*/
gulp.watch('src/images/*.*', ['image']);
gulp.watch('src/less/*.less', ['style']);
gulp.watch('src/scripts/*.js', ['scripts']);
gulp.watch('src/*.html', ['html']);

/*此处代码都是由node执行的*/

// 载入gulp模块
/*var gulp = require('gulp');
var less = require('gulp-less');
var cssnano = require('gulp-cssnano');

// 注册一个任务
gulp.task('style', function() {
	// 当gulp执行say这个任务时，会自动执行该函数
	// console.log('hello word');
	gulp.src('src/less/*.less')
		.pipe(less())	// 将less文件转换成css文件
		.pipe(cssnano())	// 压缩css
		.pipe(gulp.dest('dist/css/'));
});

gulp.task('dist', function() {
	gulp.watch('src/less/*.less', ['style']);
});*/


