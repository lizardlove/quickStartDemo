const gulp = require("gulp")
const pm2 = require("pm2")
const babel = require("gulp-babel")

let path = {
    babel: "./src/controller/**/*.js"
}

gulp.task("babel", () => {
    return gulp.src(path.babel)
    .pipe(babel())
    .pipe(gulp.dest("./dist/controller"))
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

gulp.task("default", ["babel", "pm2"])

gulp.watch(path.babel, ["babel"])