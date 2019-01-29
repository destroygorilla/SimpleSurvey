import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Err from './Err';
import * as serviceWorker from './serviceWorker';

// アンケートのパラメータ（質問文と回答選択肢）をクエリ文字列から取得
var params = new Object;
var queries = location.search.substring(1).split('&');
queries.forEach(q => {
  let pair = q.split('=');
  params[pair[0]] = decodeURIComponent(pair[1]);
});

// アンケートをレンダリング
if ('q' in params && 'a' in params) {
  ReactDOM.render(<App q={params['q']} a={params['a']}/>, document.getElementById('root'));
}
else { // 必要なクエリが無いとき用のページ
  let url = location.href.replace(/\#.*$/, '').replace(/\?.*$/, '');
  ReactDOM.render(<Err url={url}/>, document.getElementById('root'));
}

serviceWorker.unregister();
