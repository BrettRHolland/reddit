class Api::V1::CommentsController < ApplicationController
  protect_from_forgery with: :null_session

  def create
		@post = Post.new(post_params)

		if @post.save
			render json: { post: @post }
		end
	end

  def update
    @comment = Comment.find(params[:id])
    @post = Post.find(params[:post_id])
    if @comment.update(comment_params)
      @comments = Comment.where(post_id: @post.id).order(votes: :desc)
      render json: { post: @post, comments: @comments }
    end
  end

  private

	def comment_params
		params.require(:comment).permit(:post_id, :username, :body, :votes)
	end

end
