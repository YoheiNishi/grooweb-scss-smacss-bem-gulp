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
・Gitでのバージョン管理について
node_modulesフォルダは管理外とします。
グローバルのgitignoreファイルにnode_modules/と記述してください。
グローバルのgitignoreファイルの場所は/User/username/.gitignore_globalです。
不可視ファイルなので、可視化できるようにしてください。
--------------------------------------------------
・Folder
htmlフォルダが最終的な納品物フォルダ（npm run-script releaseを実行すると作成されます。）
develop-htmlフォルダが開発フォルダ
--------------------------------------------------
・インストール済みモジュール
plumber     ：Sass等のコンパイルエラーが起きてもwatchを継続させる
ejs         ：htmlテンプレートエンジン
sass        ：sassのコンパイル
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
h1{
  background: red;
  @include mq(sp){
    background: orange;
  }
}
h2{
  background: black;
  @include mq(sp){
    background: green;
  }
}

「CSS」
h1 {
  background: red;
}

h2 {
  background: black;
}
@media screen and (max-width: 768px) {
  h1 {
    background: orange;
  }

  h2 {
    background: green;
  }
}

--------------------------------------------------
・開発が終了したら
npm run-script release を実行
リリース用フォルダが作成されるので、画像フォルダをコピーして
htmlフォルダの中身をサーバーアップ
--------------------------------------------------
