class Api::FriendRequestsController < ApplicationController
  before_action :require_logged_in
  before_action :find_receiver, only: [:create]
  before_action :verify_request_sender, only: [:destroy]
  before_action :verify_request_receiver, only: [:update]

  def index
    @sent_requests = current_user.sent_friend_requests.where("status='pending'").includes(:receiver)
    @received_requests = current_user.received_friend_requests.where("status='pending'").includes(:sender)
    render :index
  end

  def create
    @friend_request = FriendRequest.new(
      sender_id: current_user.id,
      receiver_id: @receiver.id,
    )

    if @friend_request.save
      # broadcast new friend request to receiver
      FriendsChannel.broadcast_to(
        @receiver,
        type: "ADD_INCOMING_REQUEST",
        **from_template("api/friend_requests/show", friend_request: @friend_request, user: current_user),
      )

      render :show, locals: { friend_request: @friend_request, user: @receiver }
    else
      render json: { errors: @friend_request.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    if @request.destroy
      # broadcast delete request to receiver
      FriendsChannel.broadcast_to(
        @request.receiver,
        type: "DELETE_INCOMING_REQUEST",
        id: @request.id,
      )

      head :no_content
    else
      render json: { errors: @request.errors }, status: :unprocessable_entity
    end
  end

  def update
    if @request.update(status: params[:status])
      # broadcast delete request to sender since receiver made a decision
      FriendsChannel.broadcast_to(
        @request.sender,
        type: "DELETE_SENT_REQUEST",
        id: @request.id,
      )

      if params[:status] === "accepted"
        @friendship = Friend.find_by(user1_id: @request.sender.id, user2_id: current_user.id)

        # broadcast new friend info to sender
        FriendsChannel.broadcast_to(
          @request.sender,
          type: "ADD_FRIEND",
          **from_template("api/friends/show", friendship: @friendship, friend: current_user),
        )

        render "api/friends/show", locals: { friendship: @friendship, friend: @request.sender }
        return
      end

      head :no_content
    else
      render json: { errors: @request.errors }, status: :unprocessable_entity
    end
  end

  private

  def find_receiver
    @receiver = User.find_by(username: params[:username])
    if !@receiver
      render json: { errors: { error: "Hm, didn't work. Double check that the capitalization, spelling, any space, and numbers are correct." } }, status: :unprocessable_entity
    end
  end

  def verify_request_sender
    @request = FriendRequest.includes(:sender, :receiver).find(params[:id])
    if @request.sender_id != current_user.id
      render json: { errors: { error: "Must be owner to delete this request" } }, status: :forbidden
    end
  end

  def verify_request_receiver
    @request = FriendRequest.includes(:sender, :receiver).find(params[:id])
    if @request.receiver_id != current_user.id
      render json: { errors: { error: "Must be the receiver" } }, status: :forbidden
    end
  end
end
