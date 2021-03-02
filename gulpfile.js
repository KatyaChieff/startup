let gulp = require("gulp"),
    autoprefixer = require("gulp-autoprefixer"),
    sass = require("gulp-sass"),
    concat = require("gulp-concat"),
    browserSync = require("browser-sync"),
    uglify = require("gulp-uglify-es").default,
    notify = require("gulp-notify"),
    imagemin = require("gulp-imagemin"),
    cache = require("gulp-cache"),
    del = require("del"),
    gcmq = require("gulp-group-css-media-queries"),
    cleanCSS = require("gulp-clean-css"),
    sourcemaps = require("gulp-sourcemaps"),
    pug = require("gulp-pug");

gulp.task("browser-sync", function () {
    browserSync({
        //    browserSync завжди має бути першим
        server: {
            baseDir: "dist"
        },
        notify: true,
        open: true,
        browser: "chrome"
        //port 8080
    })
})

gulp.task("html", function () {
    return gulp
        .src([
            "src/pug/*.pug"
        ])
        .pipe(pug({
            //pretty: true
        }))
        .pipe(gulp.dest("dist"))
        .pipe(browserSync.reload({
            stream: true
        }))
})

gulp.task("sass", function () {
    return gulp
        .src([
            "src/sass/*.css",
            "src/sass/*.sass"
        ])
        .pipe(sourcemaps.init())
        .pipe(sass({
                outputStyle: "compressed"
            }).on("error", notify.onError())
        )
        .pipe(autoprefixer(["last 15 versions"], {
            cascade: true
        }))
        .pipe(gcmq("main.css"))
        .pipe(concat("main.css"))
        .pipe(cleanCSS({
            compatibility: "oe8"
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.reload({
            stream: true
        }))
})

gulp.task("js", function () {
    return gulp
        .src([
            "src/js/**/*.js"
        ])
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(concat("script.js"))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("dist/js"))
        .pipe(browserSync.reload({
            stream: true
        }))
})

gulp.task("files", function () {
    return gulp
        .src([
            "src/*.*"
        ])
        .pipe(gulp.dest("dist"))
        .pipe(browserSync.reload({
            stream: true
        }))
})

gulp.task("fonts", function () {
    return gulp
        .src([
            "src/fonts/**/*.*"
        ])
        .pipe(gulp.dest("dist/fonts"))
        .pipe(browserSync.reload({
            stream: true
        }))
})

gulp.task("images", function () {
    return gulp
        .src([
            "src/img/**/*"
        ])
        .pipe(cache(imagemin({
            interlaced: true
        })))
        .pipe(gulp.dest("dist/img"))
        .pipe(browserSync.reload({
            stream: true
        }))
})

gulp.task("watch", function () {
    gulp.watch("src/sass/**/*.sass", gulp.parallel("sass"))
    gulp.watch("src/js/**/*.js", gulp.parallel("js"))
    gulp.watch("src/pug/**/*.pug", gulp.parallel("html"))
    gulp.watch("src/*.*", gulp.parallel("files"))
    gulp.watch("src/fonts/**/*.*", gulp.parallel("fonts"))
    gulp.watch("src/img/**/*.*", gulp.parallel("images"))
})

gulp.task("clear", function () {
    return cache.clearAll()
})

gulp.task("default", gulp.parallel("watch", "html", "sass", "js", "files", "fonts", "images", "browser-sync"))

gulp.task("removeDist", function () {
    return del("dist")
})