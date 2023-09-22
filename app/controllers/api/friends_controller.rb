class Api::FriendsController < ApplicationController
  before_action :require_logged_in

  def index
    @friendships1 = current_user.friendships1.includes(:user2)
    @friendships2 = current_user.friendships2.includes(:user1)
    render :index
  end

  def destroy
    friend = Friend.includes(:user1, :user2).find(params[:id])

    if friend.destroy
      otherUser = (friend.user1.id === current_user.id ? friend.user2 : friend.user1)
      FriendsChannel.broadcast_to(
        otherUser,
        type: "DELETE_FRIEND",
        id: friend.id,
      )

      head :no_content
    else
      render json: { errors: friend.errors }, status: :unprocessable_entity
    end
  end
end
