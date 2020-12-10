class PostsController < ApplicationController
  def index
    @posts = Post.all.order(id: "DESC")   #全てのレコードを@postsに代入
  end
  def create
    Post.create(content: params[:content])
    redirect_to action: :index
  end
  def checked
    # ルーティングで設定したURLパラメーターのidを取得している
    post = Post.find(params[:id])
    # 取得したメモ(id)が既読か既読じゃないかの条件分岐
    if post.checked
      post.update(checked: false)
    else
      post.update(checked: true)
    end
    # 条件分岐後のparamsをitemに再代入
    item = Post.find(params[:id])
    # jsonの中身の{post: item}は{返却先: 返却元}今回の場合だと{jsファイルの33行目のpost: 上記のitem}のように記載する
    render json: { post: item }
  end
end
