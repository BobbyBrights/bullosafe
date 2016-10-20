var gulp = require('gulp'),
  watch = require('gulp-watch'),
  stylus = require('gulp-stylus'),
  autoprefixer = require('gulp-autoprefixer'),
  concat = require('gulp-concat'),
  csso = require('gulp-csso'),
  imagemin = require('gulp-imagemin'),
  rename = require('gulp-rename'),
  affected = require('gulp-jade-find-affected'),
  filter = require('gulp-filter'),
  flo = require('fb-flo'),
  mainBowerFiles = require('main-bower-files'),
  svgmin = require('gulp-svgmin'),
  cheerio = require('gulp-cheerio'),
  svgstore = require('gulp-svgstore'),
  browserSync = require('browser-sync').create(),
  path = require('path'),
  fs = require('fs');

var _pathToSrc = '../bundle/';
var _pathToBuild = '../public/static/';


/**
 * Компиляция stylus to css
 */
gulp.task('stylus', function () {
  var _options = {
    compress: true,

    paths: [_pathToSrc],
    import: [_pathToSrc + 'styl/mixins.styl', _pathToSrc + 'styl/palette.styl'],
    'include css': true
  };

  gulp.src(_pathToSrc + '**/*.styl')
    .pipe(stylus(_options))
    .on('error', console.log)
    .pipe(autoprefixer({
      browsers: ['last 2 versions', 'Firefox 43', 'Opera 34', 'ie 10', 'iOS 8', 'Safari 8']
    }))
    .pipe(csso())
    .pipe(concat('style.css'))
    .pipe(gulp.dest(_pathToBuild + 'css/'))
});

/**
 * Следим за изменениями стилей и обновляем их в браузере
 */
gulp.task('watch', ['stylus'], function () {
  var server = flo(_pathToBuild, {
    port: 8888,
    host: 'localhost',
    dir: _pathToBuild,
    glob: ['**/*.js', '**/*.css', '**/*.html']
  }, function resolver(filepath, callback) {
    var _path = _pathToBuild + filepath;
    callback({
      resourceURL: path.extname(_path),
      contents: fs.readFileSync(_path),
      update: function (_window, _resourceURL) {
        console.log('Барин, ваш css-файл готов!')
      }
    })
  });


  gulp.watch(_pathToSrc + '**/*.styl', ['stylus']);
  // gulp.watch(_pathToSrc + 'img/*', ['imagemin']);
  gulp.watch(_pathToSrc + 'img/*.svg', ['svgo']);
  gulp.watch(_pathToSrc + 'img/*.svg', ['svg-sprite']);
});

/**
 * Локальный сервер
 */
gulp.task('webserver', function () {
  var config = {
    server: {baseDir: "../public/"},
    serverStatic: '../public/static/',
    host: 'localhost',
    port: 9000
    // startPath: '/project-info1.html'
  };

  browserSync.init(config);
  gulp.watch('../public/*.html', browserSync.reload()); // FIXME T_T
});

/**
 * Минификация изображений
 */
// gulp.task('imagemin', function () {
//   gulp.src(_pathToSrc + 'img/*')
//     .pipe(imagemin({
//       plugins: [
//         imagemin.svgo({})
//       ],
//       progressive: true,
//       interlaced: true
//     }))
//     .pipe(gulp.dest(_pathToBuild + 'img/'));
// });

/**
 * Watcher .pug файлов
 */
gulp.task('watch-pug', function () {
  watch([_pathToSrc + '__blocks/**/*.pug', _pathToSrc + 'template/**/*.pug'])
    .on('error', console.log)
    .pipe(affected())
    .pipe(filter(function (file) {
      return !/[\/, \\]_/.test(file.path) && !/^_/.test(file.relative);
    }))
    .pipe(pug({
      basedir: '../',
      pretty: true
    }))
    .pipe(gulp.dest('../public/'));
});

/**
 * Компиляция .pug файлов
 */
gulp.task('pug', function () {
  gulp.src([_pathToSrc + '__blocks/**/*.pug', _pathToSrc + 'template/**/*.pug'])
    .pipe(filter(function (file) {
      return !/[\/, \\]_/.test(file.path) && !/^_/.test(file.relative);
    }))
    .pipe(pug({
      basedir: '../',
      pretty: true
    }))
    .pipe(gulp.dest('../public/'));
});

/**
 * Сборка библиотек
 */
gulp.task('bower', function () {
  return gulp.src(mainBowerFiles({
    overrides: {
      jquery: {
        main: [
          'dist/jquery.min.js'
        ]
      },
      'select2': {
        main: [
          'dist/css/select2.min.css',
          'dist/js/select2.full.min.js'
        ]
      },
      'bootstrap-datepicker': {
        main: [
          'dist/css/bootstrap-datepicker3.min.css',
          'dist/js/bootstrap-datepicker.min.js',
          'dist/locales/bootstrap-datepicker.ru.min.js'
        ]
      },
      'handlebars': {
        main: [
          'handlebars.min.js',
          'handlebars.runtime.min.js'
        ]
      },
      'ion.rangeSlider': {
        main: [
          'js/ion.rangeSlider.min.js',
          'css/ion.rangeSlider.css'

        ]
      }
    }
  }), {base: 'bower_components/'})
    .pipe(gulp.dest(_pathToBuild + 'lib/'));
});

/**
 * Минификация svg
 */
gulp.task('svgo', function () {
  return gulp.src(_pathToSrc + 'img/*.svg')
    .pipe(svgmin({js2svg: {pretty: true}}))
    .pipe(gulp.dest(_pathToBuild + 'img/svg/'));
});

/**
 * Svg спрайт
 */
gulp.task('svg-sprite', function () {
  return gulp.src(_pathToSrc + 'img/*.svg')
    .pipe(svgmin({js2svg: {pretty: false}}))
    .pipe(svgstore({inlineSvg: true}))
    .pipe(cheerio(function ($) {
      $('svg').attr('style', 'position: absolute; width: 0; height: 0;');
      // $('[fill]').removeAttr('fill');
      // $('[style]').removeAttr('style');
    }))
    .pipe(rename('icons.html'))
    .pipe(gulp.dest('../public/'));
});