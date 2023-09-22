class Api::ChannelsController < ApplicationController
  before_action :require_logged_in
  before_action :verify_server, only: [:create]
  before_action :verify_owner, only: [:destroy, :update]

  wrap_parameters include: Channel.attribute_names + ["serverId", "channelType"]

  def index
    @channels = current_user.server_memberships.find(params[:server_id]).channels
    if @channels
      render :index
    else
      render json: { errors: @channels.errors }, status: :unprocessable_entity
    end
  end

  def create
    @channel = Channel.new(create_params)

    if @channel.save
      # broadcast new channel to server
      ServersChannel.broadcast_to(
        @server,
        type: "ADD_CHANNEL",
        **from_template("api/channels/show", channel: @channel),
      )

      render json: { id: @channel.id }
    else
      render json: { errors: @channel.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    if @channel.destroy
      # broadcast delete channel to server
      ServersChannel.broadcast_to(
        @channel.server,
        type: "DELETE_CHANNEL",
        id: @channel.id,
      )

      head :no_content
    else
      render json: { errors: @channel.errors }, status: :unprocessable_entity
    end
  end

  def update
    if @channel.update(update_params)
      # broadcast updated channel info to server
      ServersChannel.broadcast_to(
        @channel.server,
        type: "UPDATE_CHANNEL",
        **from_template("api/channels/show", channel: @channel),
      )

      head :no_content
    else
      render json: { errors: @channel.errors }, status: :unprocessable_entity
    end
  end

  private

  def verify_server
    @server = Server.find(params[:server_id])
    if !@server
      render json: { errors: { error: "Invalid server" } }, status: :unprocessable_entity
    elsif @server.owner_id != current_user.id
      render json: { errors: { error: "Must be server owner" } }, status: :forbidden
    end
  end

  def verify_owner
    @channel = Channel.includes(:server).find(params[:id])
    if @channel.server.owner_id != current_user.id
      render json: { errors: { error: "Must be server owner" } }, status: :forbidden
    end
  end

  def create_params
    params.require(:channel).permit(:name, :server_id, :channel_type, :description)
  end

  def update_params
    params.require(:channel).permit(:name, :description)
  end
end
