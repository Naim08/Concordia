class Api::ConversationsController < ApplicationController
  before_action :require_logged_in

  def index
    @current_user = current_user

    owned_ids = @current_user.owned_conversations.ids
    participated_ids = @current_user.conversations.ids

    all_conversation_ids = owned_ids + participated_ids

    @conversations = Conversation.where(id: all_conversation_ids.uniq)
                                 .includes(:participants)
                                 .select { |conversation| conversation.participants.count > 1 }

    render :index
  end

  def show
    @conversation = Conversation.includes(:direct_messages).find(params[:id])
    @current_user = current_user
    render :show
  end

  def create
    @conversation = Conversation.includes(:direct_messages).new()
    @current_user = current_user
    @conversation.owner_id = @current_user.id
    if @conversation.save
      render :show
    else
      render json: @conversation.errors.full_messages, status: 422
    end
  end

  def destroy
    @conversation = Conversation.includes(:direct_messages).find(params[:id])
    if @conversation.destroy
      render :show
    else
      render json: @conversation.errors.full_messages, status: 422
    end
  end
end
