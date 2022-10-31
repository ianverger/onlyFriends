class Api::UsersController < ApplicationController
  wrap_parameters include: User.attribute_names + ['password', 'firstName', 'lastName', 'currentCity', 'profilePic']

  def index
    @users = User.all

    if @users
      render :index
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def create
    @user = User.new(user_params)

    if @user.save
      login!(@user)
      render :show
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def show
    @user = User.find(params[:id])
    render :show
  end

  def update
    @user = User.find(params[:id])
    result = false
    
    if params.has_key?(:profile_pic)
      @user.profile_pic.attach(params[:profile_pic])
      result = @user.save
    else 
      result = @user.update(user_params)
    end

    if result
      render :show
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private 

  def user_params
    params.require(:user).permit(:email, :username, :password, :first_name, :last_name, :birthday, :gender, :bio, :relationship, :hometown, :current_city, :education, :work, :profile_pic)
  end
end
