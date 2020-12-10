// check関数の作成
function check(){
  // postクラスのHTML情報をposts変数に代入
  const posts = document.querySelectorAll(".post")
  // 上記で定義したposts変数内の配列をforEachで一つずつpostに取り出す
  posts.forEach(function (post){
    if (post.getAttribute("data-load") != null) {
      return null;
    }
    post.setAttribute("data-load", "true");
    // クリックした時に
    post.addEventListener('click',() => {
      // メモをid事に取得しpostIdに代入
      const postId = post.getAttribute("date-id");
      // XMLHttpRequestを呼び出しXHRに代入
      const XHR = new XMLHttpRequest();
      // リクエストの初期化及び指定
      XHR.open("GET", `/posts/${postId}`, true);
      // レスポンスのデータ形式をjsonに指定
      XHR.responseType = "json";
      // これまで記述したリクエストの送信
      XHR.send();
      // レスポンスのデータを受信できた時に、処理をする
      XHR.onload = () => {
        // 受信されない場合の処理も記述しておく
        if (XHR.status != 200) {
          // 受信されないときのエラーをアラートさせる
          alert(`Error ${XHR.status}: ${XHR.statusText}`);
          // ここで処理は止まる
          return null;
        }
        // レスポンスされた内容をitemに代入
        const item = XHR.response.post;
        // 既読状態の場合
        if (item.checked === true) {
          // HTMLのdata-checkに"true"を追加しCSSを適用させる
          post.setAttribute("data-check", "true");
          // 既読状態じゃないとき
        } else if (item.checked === false) {
          // HTMLのdata-checkを削除する
          post.removeAttribute("data-check");
        }
      };
    });
  });
}
// 1秒毎に関数checkが実行される
setInterval(check, 1000);