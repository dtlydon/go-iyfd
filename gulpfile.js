var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('default', function() {
    // place code for your default task here
});

gulp.task('move-files', function(){
    //TODO Remove files
    var thirdPartyFiles = [
        "node_modules/core-js/client/*.js",
        "node_modules/zone.js/dist/*.js",
        "node_modules/reflect-metadata/Reflect.js",
        "node_modules/systemjs/dist/*.js",
        "systemjs.config.js",
        "node_modules/bootstrap/**/*.*",
        "node_modules/jquery/dist/jquery.min.js"
    ];

    var angularFiles = ["node_modules/@angular/**/*.js"];
    var rxjsFiles = ["node_modules/rxjs/**/*.js"];
    var memWebApiFiles = ["node_modules/angular2-in-memory-web-api/**/*.js"];

    gulp.src(thirdPartyFiles).pipe(gulp.dest("lib"));
    gulp.src(angularFiles).pipe(gulp.dest("lib/@angular"));
    gulp.src(rxjsFiles).pipe(gulp.dest("lib/rxjs"));
    gulp.src(memWebApiFiles).pipe(gulp.dest("lib/angular2-in-memory-web-api"));

});

gulp.task('styles', function(){
    var scss = 'styles/*.scss';
    gulp.src(scss)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('styles'));
});