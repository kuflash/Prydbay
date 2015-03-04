var gulp = require('gulp'),
  connect = require('gulp-connect'),
  opn = require('opn'),
  jade = require('gulp-jade'),
  sass = require('gulp-sass'),
  wiredep = require('wiredep').stream,
  useref = require('gulp-useref'),
  gulpif = require('gulp-if'),
  uglify = require('gulp-uglify'),
  autoprefixer = require('gulp-autoprefixer'),
  minifyCss = require('gulp-minify-css');







//local server
gulp.task('connect', function() {
  connect.server({
    root: 'app',
    livereload: true
  });
  //open page in browser
  opn('http://localhost:8080/');
});

//jade 
gulp.task('jade', function () {
  gulp.src(['app/jade/[^_]*.jade'])
          .pipe(jade({
            pretty: true
          }))
          .pipe(gulp.dest('app/'))
});



//html
gulp.task('html', function () {
  gulp.src('./app/*.html')
    .pipe(connect.reload());
});

// bower wiredep
gulp.task('bower', function () {
  gulp.src('./app/index.html')
    .pipe(wiredep({
     directory: "app/bower_components"
    }))
    .pipe(gulp.dest('app'));
});

//sass
gulp.task('sass', function () {
    gulp.src('app/scss/main.scss')
        .pipe(sass({
          errLogToConsole: true
        }))
        .pipe(gulp.dest('app/css/'));
});
//css
gulp.task('css', function () {
  gulp.src('./app/css/*.css')
    .pipe(connect.reload());
});

//autoprefix
gulp.task('prefix', function () {
    return gulp.src('app/css/*.css')
        .pipe(autoprefixer({
            browsers: ['last 6 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('app/css'));
});

//js
gulp.task('js', function () {
  gulp.src('./app/js/*.js')
    .pipe(connect.reload());
});
 

 //watch
gulp.task('watch', function () {
  gulp.watch(['app/*.html'], ['bower','html']);
  gulp.watch(['app/css/*.css'], ['css']);
  gulp.watch(['app/js/*.js'], ['js']);
 gulp.watch(['app/jade/*.jade'], ['jade']);
 gulp.watch(['app/scss/*.scss'], ['sass']);
});

//Сборка
gulp.task('dist', function () {
    var assets = useref.assets();
    
    return gulp.src('app/*.html')
        .pipe(assets)
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(assets.restore())
        .pipe(useref())
        .pipe(gulp.dest('dist'));
});

 
gulp.task('default', ['connect', 'watch', 'bower']);

