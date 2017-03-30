/* 使用するプラグイン（モジュールのロード） */
var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    ejs = require("gulp-ejs"),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync'),
    combineMq = require('gulp-combine-mq');
    notify = require('gulp-notify');

/*****************************************************
・Deliverablesは納品物のフォルダ
・developは開発フォルダ
・afterCompileEjsはコンパイルしたhtmlファイルが
吐き出される場所（gulpfile.jsからの相対パスで記述）を示す。
・ejsDirはコンパイルしたいejsファイルがある場所。
・templateDirはテンプレートejsファイルがある場所。
・sassCompileはsassファイルがある場所。
・afterCompileSassはコンパイル後のcssファイルがある場所。
*******************************************************/
//Deliverables Folder
var deliverables = "html/";
//Folder to develop
var develop = "develop-html/";
//config
var config = {
   "path" : {
      "sassCompile" : develop+"sass/**/*.scss",
      "sassModule" : develop+"sass/**/_*.scss",
      "afterCompileSass" : develop+"css/",
      "ejsDir"    : develop+"ejs/**/*.ejs",
      "templateDir": develop+"ejs/templates/_*.ejs",
		"utilDir": develop+"ejs/util/_*.ejs",
      "afterCompileEjs": develop
   }
},
//Folder to release
release = {
  "path" : {
    "css": deliverables+"css/",
    "js": deliverables+"js/",
    "html": deliverables,
  }
}


gulp.task('default',function(){
  //監視
  gulp.watch([config.path.ejsDir,config.path.templateDir],['EJS']);
  gulp.watch([config.path.sassCompile],['SASS']);
  gulp.watch([develop+'**/*.html',develop+'js/*.js'],['RELOAD']);

//サーバー起動
	browserSync({
		server:{
			baseDir: "./"+develop,//ルートとなるディレクトリ
			//proxy: 'localhost:8888/wordpress'
			middleware: [
				function (req, res, next) {
					// 仮想サーバーへのリクエストのurlが.htmlなら
					// index.htmlの時は / だけになる
					if (/\.html$/.test(req.url) || req.url === '/') {
						// ファイル読み込み
						var absPath='';
						if(req.url === '/'){
							absPath = path.join(__dirname, "/"+develop,'/index.html' );
						}else{
							absPath = path.join(__dirname, "/"+develop, req.url);
						}
						var data = fs.readFileSync(absPath);
						// 文字コード判定
						var charset = jschardet.detect(data);
						if (charset.encoding == 'SHIFT_JIS') {
							// shift-jisなら文字コード変換
							var source = iconvLite.decode(new Buffer(data, 'binary'), "Shift_JIS");
							res.setHeader("Content-Type", "text/html; charset=UTF-8");
							res.end(source);
						} else {
							// shift-jis以外
							next();
						}
					} else {
						next();
					}
				}
			]
		}
	});

  //ejsファイルのコンパイル
  gulp.task('EJS',function(){
    gulp.src([config.path.ejsDir,'!'+config.path.templateDir,'!'+config.path.templateDir])
    .pipe(plumber({
      errorHandler: notify.onError('Error: <%= error.message %>')
    }))
    .pipe(ejs({}, {ext: '.html'}))
    .pipe(gulp.dest(config.path.afterCompileEjs));
  });

  //sassファイルのコンパイルとプレフィックスの付与
  gulp.task('SASS',function(){
    gulp.src([config.path.sassCompile,'!'+config.path.sassModule])
    .pipe(plumber({
      errorHandler: notify.onError('Error: <%= error.message %>')
    }))
    .pipe(sass())
    .pipe(autoprefixer({browsers: ['last 3 versions','ie >=10','android >=4.2']}))
    .pipe(gulp.dest(config.path.afterCompileSass))//一度コンパイルしてから
    .pipe(combineMq())//cssを整形
    .pipe(gulp.dest(config.path.afterCompileSass))//整形したcssを再度吐きだし
    .pipe(browserSync.stream());
  });



  //ブラウザの自動リロード
  gulp.task('RELOAD',function(){
    browserSync.reload();
  })

});

gulp.task('build',function(){
  gulp.src(config.path.afterCompileSass+"**/*.css")
  .pipe(gulp.dest(release.path.css));
  gulp.src(develop+"js/**/*.js")
  .pipe(gulp.dest(release.path.js));
  gulp.src(develop+"**/*.html")
  .pipe(gulp.dest(release.path.html));
});
