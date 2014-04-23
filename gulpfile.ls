require! <[gulp gulp-util express connect-livereload tiny-lr gulp-livereload path]>

app = express!
lr = tiny-lr!

gulp.task 'css' ->
    gulp.src './css/*.css'
        .pipe gulp-livereload lr

gulp.task 'html' ->
    gulp.src './*.html'
        .pipe gulp-livereload lr

gulp.task 'js' ->
    gulp.src './js/*.js'
        .pipe gulp-livereload lr

gulp.task 'img' ->
    gulp.src './img/*.png'
        .pipe gulp-livereload lr

gulp.task 'data' ->
    gulp.src './data/*'
        .pipe gulp-livereload lr

gulp.task 'server', ->
    app.use connect-livereload!
    app.use express.static path.resolve '.'
    app.listen 3000
    gulp-util.log 'listening on port 3000'

gulp.task 'watch', ->
    lr.listen 35729, ->
        return gulp-util.log it if it
    gulp.watch './*.html', <[html]>
    gulp.watch './js/*.js', <[js]>
    gulp.watch './img/*.png', <[img]>
    gulp.watch './css/*.css', <[css]>
    gulp.watch './data/*', <[data]>

gulp.task 'dev', <[server watch]>
gulp.task 'default', <[build]>
