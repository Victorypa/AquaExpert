const   gulp          = require('gulp'),
        gutil         = require('gulp-util' ),
        sass          = require('gulp-sass'),
        browsersync   = require('browser-sync'),
        concat        = require('gulp-concat'),
        uglify        = require('gulp-uglify'),
        del           = require('del'),
        cleancss      = require('gulp-clean-css'),
        cache      	  = require('gulp-cache'),
        rename        = require('gulp-rename'),
        autoprefixer  = require('gulp-autoprefixer'),
        imagemin      = require('gulp-imagemin'),
        pngquant      = require('imagemin-pngquant'),
        notify        = require('gulp-notify');

gulp.task('browser-sync', () => {
    browsersync({
        server: {
            baseDir: 'src'
        },
        notify: false,
    })
});

gulp.task('sass', () => {
	return gulp.src('src/sass/**/*.scss')
	.pipe(sass({ outputStyle: 'expand' }).on("error", notify.onError()))
	.pipe(autoprefixer(['last 15 versions']))
	.pipe(gulp.dest('src/css'))
	.pipe(browsersync.reload( {stream: true} ))
});

gulp.task('css-libs', ['sass'], () => {
	return gulp.src([
		'node_modules/normalize.css/normalize.css',
		// 'node_modules/font-awesome/css/font-awesome.min.css',
		'node_modules/bootstrap/dist/css/bootstrap.min.css'
	])
	.pipe(concat('libs.min.css'))
	.pipe(cleancss( {level: { 1: { specialComments: 0 } } })) // Opt., comment out when debugging
	.pipe(gulp.dest('src/css'))
});

gulp.task('fonts', () => {
	return gulp.src('node_modules/font-awesome/fonts/*')
		.pipe(gulp.dest('src/fonts'))
});

gulp.task('js', () => {
	return gulp.src([
		'node_modules/jquery/dist/jquery.min.js',
		'node_modules/bootstrap/js/dist/util.js',
		'node_modules/bootstrap/js/dist/modal.js',
		'node_modules/popper.js/dist/umd/popper.js',
		'node_modules/bootstrap/js/dist/dropdown.js'
		])
	.pipe(concat('libs.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('src/js'))
	.pipe(browsersync.reload({ stream: true }))
});

gulp.task('img', () => {
	return gulp.src('src/img/**/*') 
			.pipe(cache(imagemin({
					interlaced: true,
					progressive: true,
					svgoPlugins: [{removeViewBox: false}],
					use: [pngquant()]
			})))
			.pipe(gulp.dest('dist/img')); 
});

gulp.task('clean', () => {
	return del.sync('dist');
});

gulp.task('watch', ['js', 'browser-sync', 'css-libs'], () => {
	gulp.watch('node_modules/font-awesome/fonts/*', ['fonts']);
	gulp.watch('src/js/common.js', ['js']);
	gulp.watch('src/sass/**/*.scss', ['sass']);
	gulp.watch('src/*.html', browsersync.reload)
});

gulp.task('build', ['clean', 'img', 'sass', 'js'], () => {
	const buildCss = gulp.src([
		'src/css/libs.min.css',
		'src/css/main.css'
	])
		.pipe(gulp.dest('dist/css'));

	const buildFonts = gulp.src('src/fonts/**/*') 
		.pipe(gulp.dest('dist/fonts'));

	const buildJs = gulp.src('src/js/*.js') 
		.pipe(gulp.dest('dist/js'));

	const buildHtml = gulp.src('src/*.html')
    .pipe(gulp.dest('dist'));
});