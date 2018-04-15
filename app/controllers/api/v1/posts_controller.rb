class Api::V1::PostsController < ApplicationController
  protect_from_forgery with: :null_session

  def index
    @posts = Post.order(votes: :desc)
    render json: { posts: @posts }
  end

  def show
		@post = Post.find(params[:id])
		render json: { post: @post }
	end

  def create
		@post = Post.new(post_params)

		if @post.save
			render json: { post: @post }
		end
	end

  def update
    @post = Post.find(params[:id])
    if @post.update(post_params)
      @posts = Post.order(votes: :desc)
      render json: { posts: @posts }
    end
  end

  private

	def post_params
		params.require(:post).permit(:username, :title, :url, :body, :votes)
	end

end
