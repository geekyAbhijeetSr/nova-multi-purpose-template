const gulp = require('gulp');
const { watch, series, parallel } = require('gulp');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify-es').default;
const sass = require('gulp-sass');
sass.compiler = require('node-sass');
const rename = require("gulp-rename");
const browserSync = require('browser-sync').create();
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const htmlmin = require('gulp-htmlmin');
const deleted = require('gulp-deleted')


// check deleted files
const deleted_ = () => {
    const src = 'src/**/*';
    const dest = 'dist/';
    return gulp.src(['./src/**/*', '!./src/js/**', '!./src/scss/**'])
        .pipe(deleted({
            src,
            dest,
            patterns: [
                '**/*',
                '!index.html',
                '!js/**',
                '!css/**'
            ],
        }))
        .pipe(gulp.dest('./dist/'));
}


// Html
const Html = () => {
    return gulp.src('./src/**/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('./dist/'));
};


// image
const img = () => {
    return gulp.src('./src/img/**/*')
        .pipe(gulp.dest('./dist/img/'))
}


// Sass
const Sass = () => {

    return gulp.src('./src/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(concat('all.css'))
        .pipe(postcss([
            autoprefixer()
        ]))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist/css/'))
        .pipe(browserSync.stream())
}


// Js
const Js = () => {
    return gulp.src('./src/js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(concat('all.js'))
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist/js/'));
}

// other files
const otherFiles = () => {
    return gulp.src(['./src/**', '!./src/*.html', '!./src/js/**', '!./src/img/**', '!./src/scss/**'])
        .pipe(gulp.dest('./dist/'))
}



// reload
const reload = (done) => {
    browserSync.reload()
    done()
}


// browser sync
const browsersync = () => {
    browserSync.init({
        server: {
            baseDir: "./dist/"
        }
    });

    // watching scss files
    watch("./src/scss/**/*.scss", series(Sass, reload));

    // watching js files
    watch("./src/js/**/*.js", series(Js, reload))

    // watching img files
    watch("./src/img/**/*", series(img, reload))

    // watching html files
    watch("./src/**/*.html", series(Html, reload))

    // watching other files
    watch(["./src/**/*", "!./src/scss/**/*.scss", "!./src/js/**/*.js", "!./src/img/**/*", "!./src/**/*.html"], series(otherFiles, reload))
}




export {deleted_}

export default series(deleted_, parallel(browsersync, Html, Sass, img, Js, otherFiles, reload));

