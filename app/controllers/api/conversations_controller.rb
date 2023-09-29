class Api::ConversationsController < ApplicationController
  before_action :require_logged_in

  def index
    @current_user = current_user

    ## owner_id or participant_id is current_user.id
    @conversations = Conversation.includes(:direct_messages).where(owner_id: @current_user.id).or(Conversation.includes(:direct_messages).where(participant_id: @current_user.id))
    render :index
  end

  def show
    @conversation = Conversation.includes(:direct_messages).find(params[:id])
    @current_user = current_user
    @direct_messages = @conversation.direct_messages
    @participants = @conversation.participants
    render :show
  end

  # def create
  #   @conversation = Conversation.includes(:direct_messages).new()
  #   @current_user = current_user
  #   @conversation.owner_id = @current_user.id
  #   if @conversation.save
  #     render :show
  #   else
  #     render json: @conversation.errors.full_messages, status: 422
  #   end
  # end
  def create
    @conversation = Conversation.new(owner_id: current_user.id, participant_id: params[:participant_id])
    @current_user = current_user
    target_user = User.find(params[:participant_id])

    # if existing_conversation.any?
    #   @conversation = existing_conversation.first
    # else
    if @conversation.save
      ConversationParticipant.create(conversation: @conversation, participant: target_user)
      ConversationParticipant.create(conversation: @conversation, participant: @current_user)

      UsersChannel.broadcast_to(
        target_user,
        type: "ADD_CONVERSATION",
        **from_template("api/conversations/create", conversation: @conversation),
      )
    end
    #  end

    render :show
  end

  def destroy
    @conversation = Conversation.includes(:direct_messages).find(params[:id])
    ConversationParticipant.where(conversation_id: @conversation.id).destroy_all
    if @conversation.destroy
      UsersChannel.broadcast_to(
        @conversation.participant,
        type: "DELETE_CONVERSATION",
        id: @conversation.id,
      )
      render :show
    else
      render json: @conversation.errors.full_messages, status: 422
    end
  end
end
