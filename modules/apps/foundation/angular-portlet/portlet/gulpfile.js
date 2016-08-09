var gulp = require('gulp');
var ts = require('gulp-typescript');
 
gulp.task('default', function () {

	return new Promise(
		function(resolve, reject) {
			gulp.src([
				'node_modules/core-js/**/*',
				'node_modules/zone.js/**/*',
				'node_modules/reflect-metadata/**/*',
				'node_modules/systemjs/**/*',
				'node_modules/@angular/**/*',
				'node_modules/angular2-in-memory-web-api/**/*',
				'node_modules/rxjs/**/*'
			], 
			{
				base: './'
			})
			.pipe(gulp.dest('src/main/resources/META-INF/resources/js'))
			.on('end', resolve);

		}).then(
			function() {
				gulp.src(['src/main/resources/**/*.ts','!**/node_modules/**'])
					.pipe(
						ts(
							{
								noImplicitAny: true,
								experimentalDecorators: true,
								module: 'amd',
								moduleResolution: 'node'
							}
						)
					).pipe(gulp.dest('classes'));
			}
		);
});