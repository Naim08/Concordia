class MessagesChannel < ApplicationCable::Channel
  def subscribed
    @message_channel = Channel.find_by(id: params[:id])

    stream_for @message_channel
  end
end
