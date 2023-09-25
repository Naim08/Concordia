class Api::DirectMessagesController < ApplicationController
 before_action :require_logged_in

  def show
    @direct_message = DirectMessage.find(params[:id])
    render :show
  end

  def index
    @direct_messages = DirectMessage.all
    render :index
  end

  def create
    @direct_message = DirectMessage.new(direct_message_params)
    @conversation = Conversation.find_by(id: params[:conversation_id])
    @direct_message.creator_id = current_user.id
    @direct_message.conversation_id = @conversation.id

    if @direct_message.save
      ConversationChannel.broadcast_to(@conversation, @direct_message)
      render :show
    else
      render json: @direct_message.errors.full_messages, status: 422
    end
  end

  def update
    @direct_message = DirectMessage.find(params[:id])
    @conversation = Conversation.find(@direct_message.conversation_id)
    if (@direct_message && @direct_message.creator_id == current_user.id) && @direct_message.update(direct_message_params)
      ConversationChannel.broadcast_to(@conversation, @direct_message)
      render :show
    else
      render json: @direct_message.errors.full_messages, status: 422
    end
  end

  def destroy
    @direct_message = DirectMessage.find(params[:id])
    @conversation = Conversation.find(@direct_message.conversation_id)
    if (@direct_message.creator_id == current_user.id && @direct_message.destroy)
      ConversationChannel.broadcast_to(@conversation, @direct_message)
      render :show
    else
      render json: @direct_message.errors.full_messages, status: 422
    end
  end

  private

  def direct_message_params
    params.require(:direct_message).permit(:content)
  end
end
