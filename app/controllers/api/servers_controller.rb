class Api::ServersController < ApplicationController
  before_action :require_logged_in, only: [:index, :show, :create, :update, :destroy]
  before_action :verify_owner, only: [:destroy, :update]
  wrap_parameters include: Server.attribute_names + [:photo], format: :multipart_form

  def index
    @servers = current_user.server_memberships
    render :index
  end

  def create
    @server = Server.new(server_params)
    @server.owner_id = current_user.id
    @server.photo.attach(params[:server][:server_photo_url]) if params[:server][:server_photo_url]
    if @server.save
      # @server.members << current_user
      render :show, locals: { server: @server }
    else
      render json: { errors: @server.errors }, status: :unprocessable_entity
    end
  end

  def show
    @server = Server.find(params[:id])

    render :show
  end

  def update
    if @server.update(update_params)
      @server.members.each do |member|
        UsersChannel.broadcast_to(
          member,
          type: "UPDATE_SERVER",
          **from_template("api/servers/show", server: @server),
        )
      end

      head :no_content
    else
      render json: { errors: @server.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    @server = Server.find(params[:id])
    @members = @server.members.pluck(:id)
    if @server.destroy
      User.where(id: @members).each do |member|
        UsersChannel.broadcast_to(
          member,
          type: "DELETE_SERVER",
          id: @server.id,
        )
      end

      head :no_content
    else
      render json: { errors: @server.errors }, status: :unprocessable_entity
    end
  end

  private

  def verify_owner
    @server = params[:server] ? Server.includes(:members).find(params[:server][:id]) : Server.includes(:members).find(params[:id])
    if @server.owner_id != current_user.id
      render json: { errors: { error: "Must be server owner" } }, status: :forbidden
    end
  end

  def server_params
    params.require(:server).permit(:name, :server_photo_url)
  end

  def update_params
    params.require(:server).permit(:name, :server_photo_url)
  end
end
