class Api::CommentsController < ApplicationController
    wrap_parameters include: Like.attribute_names + ['userId', 'postId']
    before_action :find_post
    before_action :find_comment, only: [:destroy]

    # def index
    #     @comments = @post.comments.all

    #     if @comments
    #         render :index
    #     end
    # end

    def create
        @post.comments.create(comment_params)
    end

    def destroy
        if @comment
            @comment.destroy
        end
    end

    private

    def comment_params
        params.require(:comment).permit(:body, :author_id, :post_id)
    end

    def find_post
        @post = Post.find(params[:post_id])
    end

    def find_comment
        @comment = @post.comments.find(params[:id])
    end
end
