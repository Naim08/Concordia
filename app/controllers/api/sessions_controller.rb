class Api::SessionsController < ApplicationController
  before_action :require_logged_out, only: [:create]
  before_action :require_logged_in, only: [:destroy]

  def show
    if current_user
      @user = current_user
      render "api/users/show"
    else
      render json: { user: nil }
    end
  end

  def create
    @user = User.find_by_credentials(params[:credential], params[:password])

    if @user
      login!(@user)

      @user.memberships.includes(:server).each do |membership|
        ServersChannel.broadcast_to(
          membership.server,
          type: "UPDATE_MEMBER",
          **from_template("api/memberships/show", membership: membership),
        )
      end
      render "api/users/show"
    else
      render json: { errors: { login: ["Login or password is invalid."] } }, status: :unauthorized
    end
  end

  def destroy
    logout! if current_user
    render json: { message: "Logout Success" }
  end
end
