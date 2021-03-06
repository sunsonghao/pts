/*
 * @Description: 
 * @Author: sunsh
 * @Date: 2021-08-23 15:50:27
 * @LastEditors: sunsh
 * @LastEditTime: 2021-09-14 17:38:28
 */
const gulp = require('gulp');
const del = require('del');
const babel = require('gulp-babel');
const eslint = require('gulp-eslint');
const plugins = require('gulp-load-plugins')();
const babelConfig = require('./babel.custom.config');
const browserSync = require('browser-sync');
const path = require('path');
const { reload } = browserSync;
const htmlReplace = require('gulp-html-replace');
const rename = require('gulp-rename');
const through2 = require('through2');
// gulp-html-replace 
// rimraf
// gulp-tasks-monorepo

const srcPath = path.join(__dirname, 'packages/*/src');

let jsPath = [], cssPath = [];
gulp.task('get-path', function() {
    jsPath.length = 0;
    
    // return是为了用来支持异步操作.on
    return gulp.src(['./dist/**/*.js', './dist/**/*.css'])
    .pipe(through2.obj(function (chunk, enc, callback) {
        this.push(chunk.path.split('dist')[1])
        callback()
    }))
    .on('data', (data) => {
        let path1 = data.split(path.sep).join('/').trim();
        let extname = path.extname(path1);
        if (extname === '.js') {
            jsPath.push(path1);
        } else if (extname === '.css'){
            cssPath.push(path1);
        } else {

        }
    })
    .on('end', () => {
    })
});

gulp.task('clean', function(cb) {
    del(['./dist'], cb);
});

gulp.task('copy', function() {
    let path = ['/*.html', '/*.css'].map(slice => srcPath +slice );
    
    gulp.src(path, { base: 'packages'})
    .pipe(gulp.dest('dist'));
})

gulp.task('dev', function() {
    browserSync({
        server: {
            baseDir: 'dist'
        }
    });

    gulp.watch(['**/*.html', '**/*.js', '**/*.css'], { cwd: 'dist'}, event => {
        console.log('watch dist change');
        // index.html中生成新的style链接
        if (path.extname(event.path) === '.css') {
            plugins.sequence('get-path', 'replace-html', function() {
                reload();
            });
            return;
        }
        reload();
    });
    gulp.watch(['*/src/**/*.html', '*/src/**/*.css'], { cwd: 'packages'}, ['copy']);
    gulp.watch(['*/src/**/*.js'], { cwd: 'packages'}, event => {
        plugins.sequence('eslint', 'to-es5', 'get-path', 'replace-html')(function(err) {
            if (err) console.log('sequence error:', err)
        });
    });
});

gulp.task('replace-html', () => {
    gulp.src('./template.html')
    .pipe(htmlReplace({
        js: {
            src: jsPath,
            tpl: '<script src="%s"></script>'
        },
        css: {
            src: cssPath,
            tpl: '<style src="%s"></style>'
        }
    }))
    .pipe(rename('index.html'))
    .pipe(gulp.dest('dist'));
});

gulp.task('to-es5', () =>
    gulp.src([srcPath + '/*.js'], { base: 'packages'})
        .pipe(babel(babelConfig))
        .on('error', () => {
            console.log('babel error');
        })
        .pipe(gulp.dest('dist'))
);

gulp.task('eslint', function() {
    return gulp.src([srcPath + '**/*.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('default', (cb) => {
    plugins.sequence('eslint', 'to-es5', cb);
});

// 入口
gulp.task('server', cb => {
    plugins.sequence('clean', 'eslint', 'to-es5', 'get-path', 'replace-html', 'dev', cb);
});