const imagemin = require('gulp-imagemin'),
  clone = require('gulp-clone'),
  sink = clone.sink(),
  webp = require('gulp-webp'),
  cache = require('gulp-cache'),
  imgCompress = require('imagemin-jpeg-recompress'),
  imgPATH = {
    input: [
      './dev/static/images/**/*.{png,jpg,gif,svg,webp}',
      '!./dev/static/images/svg/*',
    ],
    output: './build/static/images/',
  }

module.exports = function () {
  $.gulp.task('img:dev', () => {
    return $.gulp.src(imgPATH.input).pipe($.gulp.dest(imgPATH.output))
  })

  $.gulp.task('img:build', () => {
    return $.gulp
      .src(imgPATH.input)
      .pipe(
        cache(
          imagemin([
            imgCompress({
              loops: 4,
              min: 70,
              max: 80,
              quality: 'high',
            }),
            imagemin.gifsicle(),
            imagemin.optipng(),
            imagemin.svgo(),
          ])
        )
      )
      .pipe(sink)
      .pipe(webp({ quality: 75 }))
      .pipe(sink.tap())
      .pipe($.gulp.dest(imgPATH.output))
  })
}
