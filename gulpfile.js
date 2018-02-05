const gulp = require("gulp")
const pm2 = require("pm2")
const babel = require("gulp-babel")
const webpack = require("webpack")

const config = require("./webpack.build.config")

let path = {
    babel: "./src/controller/**/*.js"
}

gulp.task("build", (cb) => {
    webpack(config, (err) => {
        if (err) {
            console.error(err)
        }
    })
    return cb()
})

gulp.task("server", () => {
    return gulp.src(["./config.json", "./src/app.js"])
    .pipe(gulp.dest("./build"))
})

gulp.task("babel", () => {
    return gulp.src(path.babel)
    .pipe(babel())
    .pipe(gulp.dest("./build/controller"))
})

gulp.task("pm2", ["babel"], (cb) => {
    pm2.connect(() => {
        pm2.start("./server.dev.js", {name: "server", watch: true}, (err) => {
            if (err) {
                pm2.disconnect();
            }
        })
        return cb()
    })
})

gulp.task("development", ["babel", "pm2"], () => {
    gulp.watch(path.babel, ["babel"])
})

gulp.task("production", ["babel", "server", "build"])