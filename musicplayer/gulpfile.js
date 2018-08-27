var gulp = require("gulp");
var imagemin = require("gulp-imagemin");
var newer = require("gulp-newer");
var htmlClean = require("gulp-htmlclean");
var jsuglify = require("gulp-uglify");
var stripDebug = require("gulp-strip-debug");
var concat = require("gulp-concat");
var less = require("gulp-less");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var cssnano = require("cssnano");
var connect = require("gulp-connect");

var devMode = process.env.NODE_ENV == "development";



var folder = {
    src: "./src/",
    build: "./build/"
}

gulp.task("html", function () {
    var page = gulp.src(folder.src + "html/*")
    .pipe(connect.reload())
    if (!devMode) {
        page.pipe(htmlClean())
    }
    page.pipe(gulp.dest(folder.build + "html/"))
})

//流读取文件
gulp.task("images", function () {
    gulp.src(folder.src + "images/*")

        .pipe(newer(folder.build + "images"))
        .pipe(imagemin())
        .pipe(gulp.dest(folder.build + "images/"))

})

gulp.task("js", function () {
    var page = gulp.src(folder.src + "js/*")
    .pipe(connect.reload())
   // if (!devMode) {
       // page.pipe(stripDebug())
      //  page.pipe(jsuglify())
   // }
    page.pipe(gulp.dest(folder.build + "js/"))
})

gulp.task("css", function () {
    var options = [autoprefixer(), cssnano()];
    var page = gulp.src(folder.src + "css/*")
    .pipe(connect.reload())
        .pipe(less())
    if (!devMode) {
        page.pipe(postcss(options))
    }
    page.pipe(gulp.dest(folder.build + "css/"))
})

gulp.task("watch", function () {
    gulp.watch(folder.src + "html/*", ["html"]);
    gulp.watch(folder.src + "css/*", ["css"]);
    gulp.watch(folder.src + "js/*", ["js"]);
    gulp.watch(folder.src + "images/*", ["images"]);
})

gulp.task("server",function(){
    connect.server({
        port : "8090",
        livereload:true
    })
})


gulp.task('default', ["images", "html", "js", "css", "watch","server"])
/*
gulp.src()// read file
gulp.dest()//write file
gulp.task() //excute task
gulp.watch()//evenetListner
*/


// gulp.task("default",["html","images"],function(){
//     console.log(11);
// })