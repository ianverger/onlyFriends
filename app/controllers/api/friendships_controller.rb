class Api::FriendshipsController < ApplicationController
    wrap_parameters include: User.attribute_names + ['requesterId', 'requesteeId', 'confirmed']

    def create
        @friendship = Friendship.new(friendship_params)

        if @friendship.save
            @user1 = User.find(friendship_params[:requester_id])
            @user2 = User.find(friendship_params[:requestee_id])
            @users = [@user1, @user2]
     
            render :update
        else
            render json: { errors: @friendship.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def index
        
        @user = User.find(params[:user_id])
        @friends = @user.friends
        
        render :index
    end

    def update
        @friendship = Friendship.find_request(friendship_params[:requester_id], friendship_params[:requestee_id])
        # @friendship = Friendship.find(params[:id])

        if @friendship.update(friendship_params)
            @user1 = User.find(friendship_params[:requester_id])
            @user2 = User.find(friendship_params[:requestee_id])
            @users = [@user1, @user2]
            render :update
        else
            render json: { errors: @friendship.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def destroy
        @friendship = Friendship.find_request(friendship_params[:requester_id], friendship_params[:requestee_id])
        # @friendship = Friendship.find(params[:id])
        
        if @friendship
            @friendship.destroy
            @user1 = User.find(friendship_params[:requester_id])
            @user2 = User.find(friendship_params[:requestee_id])
            @users = [@user1, @user2]
            render :update
        end
    end

    private
    
    def friendship_params
        params.require(:friendship).permit(:id, :requester_id, :requestee_id, :confirmed)
    end 
end
