class Api::LikesController < ApplicationController
    wrap_parameters include: Like.attribute_names + ['userId', 'postId']
    before_action :find_post
    before_action :find_like, only: [:destroy]

    def create
        if already_liked?
            render json: { errors: ["Cannot like more than once"] }, status: :unprocessable_entity
        else
          @post.likes.create(user_id: current_user.id)
        end
    end

    def destroy
        if !already_liked?
            render json: { errors: ["Cannot unlike more than once"] }, status: :unprocessable_entity
        else
          @like.destroy
        end
    end

    private

    def like_params
        params.require(:like).permit(:user_id, :post_id)
    end

    def find_post
        @post = Post.find(params[:post_id])
    end

    def find_like
        @like = @post.likes.find(params[:id])
    end

    def already_liked?
        Like.where(user_id: current_user.id, post_id:
        params[:post_id]).exists?
    end
end
