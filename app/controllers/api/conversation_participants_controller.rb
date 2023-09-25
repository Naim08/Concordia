class Api::ConversationParticipantsController < ApplicationController
  before_action :require_logged_in

  def show
    target_participant_conversations = ConversationParticipant.where(participant_id: params[:id]).pluck(:conversation_id)
    current_user_conversations = ConversationParticipant.where(participant_id: current_user.id).pluck(:conversation_id)

    common_conversation_ids = target_participant_conversations & current_user_conversations

    @common_conversations = Conversation.where(id: common_conversation_ids)

    render :show
  end

  def create
    @conversation_participant = ConversationParticipant.new(conversation_participant_params)
    @current_user_conversation_participant = ConversationParticipant.new(conversation_id: params[:conversation_participant][:conversation_id], participant_id: current_user.id)
    @conversation = Conversation.find(params[:conversation_participant][:conversation_id])
    @participants = [@conversation_participant, @current_user_conversation_participant]
    if @conversation_participant.save && @current_user_conversation_participant.save
      UsersChannel.broadcast_to(
        @conversation_participant.participant,
        type: "ADD_CONVERSATION",
        **from_template("api/conversation_participants/show"),
      )

      render :show
    else
      render json: @conversation_participant.errors.full_messages, status: 422
    end
  end

  def destroy
    @conversation_participant = ConversationParticipant.find_by(conversation_participant_params)
    @conversation = Conversation.find(params[:conversation_participant][:conversation_id])
    @conversation_participant.destroy
    UsersChannel.broadcast_to(
      @conversation_participant.participant,
      type: "DELETE_CONVERSATION",
      id: @conversation_participant.conversation_id,
    )

    render "api/conversations/show"
  end

  private

  def conversation_participant_params
    params.require(:conversation_participant).permit(:conversation_id, :participant_id)
  end
end
