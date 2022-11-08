class Api::CommentsController < ApplicationController
    wrap_parameters include: Comment.attribute_names + ['authorId', 'postId']
    before_action :find_post
    before_action :find_comment, only: [:destroy]

    def create
        @comment = @post.comments.create(comment_params)

        if @comment.save
            render 'api/posts/show'
        end
    end

    def destroy
        if @comment
            @comment.destroy
            render 'api/posts/show'
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
