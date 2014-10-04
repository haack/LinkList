var gulp = require('gulp');

gulp.task('shipit', function() {
	return gulp.src(['index.html', 'css/*'])
        .pipe(gulp.dest('/Library/WebServer/Documents'));
});