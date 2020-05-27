const gulp = require("gulp")
// 拷贝html文件
//gulp-htmlmin 压缩html代码
const htmlmin = require("gulp-htmlmin")
gulp.task("copy-html",function(){
    return gulp.src("*.html")
    // .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("dist/"))
    .pipe(connect.reload())
})
//js代码处理
gulp.task("scripts",function(){
    return gulp.src(["*.js","!gulpfile.js"])
    .pipe(gulp.dest("dist/js"))
    .pipe(connect.reload())
})
//图片
gulp.task("images",function(){
    return gulp.src("images/**/*")
    .pipe(gulp.dest("dist/images"))
    .pipe(connect.reload())
})
// 数据
gulp.task("data",function(){
    return gulp.src(["*.json","!package.json"])
    .pipe(gulp.dest("dist/data"))
    .pipe(connect.reload())
})



// 已下载插件
// gulp-sass 批量处理css
// gulp-minify-css 压缩css代码
// gulp-rename 重命名
// gulp-uglify 压缩js

// 使用插件
const scss = require("gulp-sass")
const minify = require("gulp-minify-css")
const rename = require("gulp-rename")
gulp.task("scss1",function(){
    return gulp.src("index.scss")
    .pipe(scss())
    .pipe(gulp.dest("dist/css"))
    .pipe(minify())
    .pipe(rename("index.min.css"))
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload())

})

gulp.task("scss2",function(){
    return gulp.src("css.scss")
    .pipe(scss())
    .pipe(gulp.dest("dist/css"))
    .pipe(minify())
    .pipe(rename("css.min.css"))
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload())
})
gulp.task("scss3",function(){
    return gulp.src("base.scss")
    .pipe(scss())
    .pipe(gulp.dest("dist/css"))
    .pipe(minify())
    .pipe(rename("base.min.css"))
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload())
})


//将上面所有的任务执行一遍，在监听之前，将所有的任务，先去执行一遍
gulp.task("build",["copy-html","scripts","images","data","scss1","scss2","scss3"],function(){
    console.log("项目建立成功")
})

//设置监听，设置服务，同时启动监听和服务
gulp.task("watch",function(){
    gulp.watch("*.html",["copy-html"])
    gulp.watch(["*.js","!gulpfile.js"],["scripts"])
    gulp.watch("images/**/*",["images"])
    gulp.watch(["*.json","!package.json"],["data"])
    gulp.watch("index.scss",["scss1"])
    gulp.watch("css.scss",["scss2"])
    gulp.watch("base.scss",["scss3"])

})
// 启动服务器  这个服务器没办法执行php和mysql
const connect = require("gulp-connect")
gulp.task("server",function(){
    connect.server({
        root:"dist",//路径
        port:8888,//端口号
        livereload:true  //实时更新
    })
})

// 设置默认任务
gulp.task("default",["watch","server"])