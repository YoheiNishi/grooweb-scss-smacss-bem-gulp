・「node」インストール作業時に参照するページ
http://qiita.com/oreo3@github/items/622fd6a09d5c1593fee4
http://www.task-notes.com/entry/20141130/1417319179
--------------------------------------------------
・汎用コマンド

インストールしているプラグイン一覧表示コマンド
npm list --depth=0

プラグインインストールコマンド
npm install --save-dev プラグイン名

プラグインアンインストールコマンド
npm uninstall --save-dev プラグイン名

gulp実効コマンド
npm start

gulpモジュールインストールコマンド
npm install

ターミナルで特定フォルダに移動するコマンド
cdスペースフィンダーからフォルダをドラッグアンドドロップ
例：cd /Users/hogehoge/Desktop/gulp
--------------------------------------------------
・Folder
htmlフォルダが最終的な納品物フォルダ（npm run-script releaseを実行すると作成されます。）
develop-htmlフォルダが開発フォルダ
--------------------------------------------------
・インストール済みモジュール
plumber     ：Sass等のコンパイルエラーが起きてもwatchを継続させる
ejs         ：htmlテンプレートエンジン
sass        ：sassのコンパイル
spritesmith ：cssスプライトの作成
autoprefixer：cssにプレフィックスを自動付与
browserSync ：ライブリロード
combineMq   ：複数箇所のメディアクエリを一つにまとめる
notify      ：エラーを知らせる
--------------------------------------------------
・Usage
プロジェクトフォルダにpackage.jsonとgulpfile.jsをコピペ。
ターミナルでプロジェクトフォルダに移動して、npm install を実行。
ターミナルで npm start を実行すると、gulpがスタート。
動作させた後は、ターミナルを触る必要はありません。
ターミナルを終了させる場合は、ctrl + c 押して、
exitでターミナルが終了する。

cssスプライトの使用方法
gulpを動作させる前にspriteフォルダの中にフォルダを作成。
フォルダ名は後に使用したい画像名にする。
gulpを起動させて、作成したフォルダの中に一度に画像を入れる。
imageフォルダの中にスプライトした画像が「~~~.png」の名前で作成される。
@include sprite(¥¥¥¥);という風にscssに記述すれば使用できる。
¥¥¥¥の部分は吐き出されたscssを確認し、$¥¥¥¥-nameというのが複数個
記述されているので、使用したい画像の名前を使用する。
例：bg-title.pngとbg-txt.pngをaaaというフォルダに入れてスプライトすると、
/sass/module/の中にaaa.scssができている。その中に、$bg-title-nameと$bg-txt-nameがあるので、
bg-title.pngを表示したければ、@include sprite($bg-title);と記述する。

ejsの使用方法
「~~~.ejs」は「~~~.html」にコンパイルされる。
「_~~~.ejs」という風に、先頭にアンダースコアをつけるとコンパイルされないので、
他のhtmlファイルにincludeする為のファイル「テンプレートファイル」になる。
詳しい使用方法は「http://qiita.com/y_hokkey/items/31f1daa6cecb5f4ea4c9」を参照。

browserSyncの使用方法
gulpを起動させると、自動的にブラウザが開かれるので、後は、何もしなくて良い。
wordpressで使用したい場合は、gulpfile.jsの48行目のbaseDirの部分をコメントアウトして、proxyをアンコメントする。
ターミナルに表示される、External URLがローカルサーバーのURL。
このローカルサーバーにアクセスすれば、携帯でもローカルファイルを閲覧可能

autoprefixerの使用方法
Sassをコンパイルすると、自動でプレフックスを付与するので、操作不要。
プレフックス対象ブラウザを変更したい場合は、オプションを変更することで可能。
例：.pipe(autoprefixer({browsers: ['last 3 versions','ie >=10','android >=4.2']}))
の場合、最新ブラウザから３つとie10以上とandroid4.2以上となる。

combineMqの使用方法
Sassをコンパイルすると、自動で動作する。
例：
「Sass」
h1 {
  font-size: 1.6em;
  @media screen and (min-width: 600px) {
    font-size: 1.8em;
  }
  @media screen and (min-width: 960px) {
    font-size: 2em;
  }
  @media screen and (min-width: 1240px) {
    font-size: 3em;
  }
}

h2 {
  font-size: 1.4em;
  @media screen and (min-width: 600px) {
    font-size: 1.6em;
  }
  @media screen and (min-width: 960px) {
    font-size: 1.7em;
  }
  @media screen and (min-width: 1240px) {
    font-size: 2.6em;
  }
}

「CSS」
h1 {
  font-size: 1.6em;
}

h2 {
  font-size: 1.4em;
}

@media screen and (min-width: 600px) {
  h1 {
    font-size: 1.8em;
  }

  h2 {
    font-size: 1.6em;
  }
}

@media screen and (min-width: 960px) {
  h1 {
    font-size: 2em;
  }

  h2 {
    font-size: 1.7em;
  }
}

@media screen and (min-width: 1240px) {
  h1 {
    font-size: 3em;
  }

  h2 {
    font-size: 2.6em;
  }
}

--------------------------------------------------
・開発が終了したら
npm run-script release を実行
リリース用フォルダが作成されるので、画像フォルダをコピーして
htmlフォルダの中身をサーバーアップ
--------------------------------------------------
