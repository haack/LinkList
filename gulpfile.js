var gulp = require('gulp');
    gp_concat = require('gulp-concat'),
    gp_rename = require('gulp-rename'),
    gp_uglify = require('gulp-uglify');

gulp.task('shipit', function() {
	//sync the folder to apache root
	return gulp.src(['**/*'])
        .pipe(gulp.dest('/Library/WebServer/Documents'));
});

gulp.task('watch', function() {
	//watches files for changes
	gulp.watch('js/*', ['shipit']);
	gulp.watch('*.html', ['shipit']);
	gulp.watch('css/*', ['shipit']);
	gulp.watch('*.js', ['shipit']);
}); 