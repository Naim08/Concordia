class Api::MessagesController < ApplicationController
  before_action :require_logged_in
  before_action :verify_membership, only: [:create]
  before_action :verify_author, only: [:update, :destroy]

  def index
    @messages = current_user.channel_memberships.find(params[:channel_id]).messages
    if @messages
      render :index
    else
      render json: { errors: @messages.errors }, status: :unprocessable_entity
    end
  end

  def create
    @message = Message.new(
      body: params[:body],
      channel_id: params[:channel_id],
      author_id: current_user.id,
    )

    if @message.save
      MessagesChannel.broadcast_to(
        @message.channel,
        type: "RECEIVE_MESSAGE",
        **from_template("api/messages/show", message: @message),
      )

      head :no_content
    else
      render json: { errors: @message.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    if @message.destroy
      MessagesChannel.broadcast_to(
        @message.channel,
        type: "DESTROY_MESSAGE",
        id: @message.id,
      )

      head :no_content
    else
      render json: { errors: @message.errors }, status: :unprocessable_entity
    end
  end

  def update
    if @message.update(update_params)
      MessagesChannel.broadcast_to(
        @message.channel,
        type: "UPDATE_MESSAGE",
        **from_template("api/messages/show", message: @message),
      )

      head :no_content
    else
      render json: { errors: @message.errors }, status: :unprocessable_entity
    end
  end

  private

  def verify_membership
    if !current_user.channel_memberships.find(params[:channel_id])
      render json: { errors: { error: "Must be a member to post messages" } }, status: :forbidden
    end
  end

  def verify_author
    @message = Message.find(params[:id])
    if @message.author_id != current_user.id
      render json: { errors: { error: "Must be author" } }, status: :forbidden
    end
  end

  def update_params
    params.require(:message).permit(:body)
  end
end
