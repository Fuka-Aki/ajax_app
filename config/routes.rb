# ルーティングを設定する
Rails.application.routes.draw do
 # [HTTPメソッド] '[URIパターン]', to: '[コントローラー名]#[アクション名]'の順で記載
  root to: 'posts#index'
  post 'posts', to: 'posts#create'
end
