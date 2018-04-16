class Api::V1::CommentsController < ApplicationController
  protect_from_forgery with: :null_session

  def create
		@comment = Comment.new(comment_params)

		if @comment.save
      @post = Post.find(params[:post_id])
      @comments = Comment.where(post_id: @post.id).order(votes: :desc, created_at: :asc)
      render json: { post: @post, comments: @comments }
		end
	end

  def update
    @comment = Comment.find(params[:id])

    if @comment.update(comment_params)
      @post = Post.find(params[:post_id])
      @comments = Comment.where(post_id: @post.id).order(votes: :desc, created_at: :asc)
      render json: { post: @post, comments: @comments }
    end
  end

  private

	def comment_params
		params.require(:comment).permit(:post_id, :username, :body, :votes)
	end

end
