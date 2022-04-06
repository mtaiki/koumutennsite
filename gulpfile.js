const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssSorter = require("css-declaration-sorter");
const mmq = require("gulp-merge-media-queries");

const browserSync = require("browser-sync");

const cleanCss = require("gulp-clean-css");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const htmlBeautify = require("gulp-html-beautify");

function test(done) {
    console.log("Hello Gulp");
    done();
}

function compileSass() {
    return gulp.src("./src/assets/sass/**/*.scss")
    .pipe(sass())
    .pipe(postcss([autoprefixer(), cssSorter()]))
    .pipe(mmq())
    .pipe(gulp.dest("./public/assets/css"))
    .pipe(cleanCss())
    .pipe(rename({
        suffix: ".min"
    }))
    .pipe(gulp.dest("./public/assets/css"))
}

function watch() {
    gulp.watch("./src/assets/sass/**/*.scss", gulp.series(compileSass, browserRelodae));
    gulp.watch("./src/assets/js/**/*.js", gulp.series(minJS, browserRelodae));
    gulp.watch("./src/assets/image/**/*", gulp.series(copyImage, browserRelodae));
    gulp.watch("./src/**/*.html", gulp.series(formatHTML, browserRelodae));
}

function browserInit(done) {
    browserSync.init({
        server: {
            baseDir: "./public/"
        }
    });
    done();
}

function browserRelodae(done) {
    browserSync.reload();
    done();
}

function minJS() {
    return gulp.src("./src/assets/js/**/*.js")
    .pipe(gulp.dest("./public/assets/js/"))
    .pipe(uglify())
    .pipe(rename({
        suffix: ".min"
    }))
    .pipe(gulp.dest("./public/assets/js"))
}

function formatHTML() {
    return gulp.src("./src/**/*.html")
    .pipe(htmlBeautify({
        indent_size: 2,
        indent_with_tabs: true,
    }))
    .pipe(gulp.dest("./public"))
}

function copyImage() {
    return gulp.src("./src/assets/image/**/*")
    .pipe(gulp.dest("./public/assets/image"))
}

exports.test = test;
exports.compileSass = compileSass;
exports.watch = watch;
exports.browserInit = browserInit;
exports.dev = gulp.parallel(browserInit, watch);
exports.minJS = minJS;
exports.formatHTML = formatHTML;
exports.build = gulp.parallel(formatHTML, compileSass, minJS, copyImage);