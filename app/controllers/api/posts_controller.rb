class Api::PostsController < ApplicationController
    
    def index
        @posts = Post.all
        @posts = @posts.where(author_id: return_author_id) if return_author_id

        if @posts 
            render :index
        else
            render json: { errors: @post.errors.full_messages }, status: :unprocessable_entity
        end
    end
    
    def create
        @post = Post.new(post_params)
        
        if @post.save
            @posts = Post.all
            @posts = @posts.where(author_id: return_author_id) if return_author_id
 
            render :index
        else
            render json: { errors: @post.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def update
        @post = Post.find(params[:id])
       
        if @post.update(post_params)
            render :show
        else
            render json: { errors: @post.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def destroy
        @post = Post.find(params[:id])

        if @post
            @post.destroy
            render json: {}
        end
    end

    private
    
    def post_params
        params.require(:post).permit(:body, :author_id)
    end 

    def return_author_id
        return nil unless params[:author_id]
        params[:author_id]
    end
end
