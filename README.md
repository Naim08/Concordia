# ConCordia:
ConCordia is a web application that emulates the core features of the popular communication platform, Discord. Users can create and join servers, participate in real-time chat channels, send direct messages to other users, and manage their friend lists. The application supports both text-based communication and voice chat, providing a comprehensive communication experience.

[Live Link](https://concordia.naimmiah.com)
---

## Technologies Used:

- **Rails Backend**: The backend is built using Ruby on Rails, serving as an API server. It handles data persistence, user authentication, business logic, and real-time communication.

- **ReactJS on the Frontend**: The frontend is developed using ReactJS, a popular JavaScript library for building user interfaces. It provides a dynamic and responsive user experience.

- **WebSockets (ActionCable)**: For real-time communication, the app uses ActionCable, a Rails framework for WebSockets. This ensures that messages, notifications, video call signals, and other real-time updates are instantly delivered to users.

- **PostgreSQL**: The application's data is stored in a PostgreSQL database, a powerful and scalable relational database system.

- **DigitalOcean**: The application is hosted on DigitalOcean, a cloud infrastructure provider, ensuring its availability and scalability.

- **WebRTC (Web Real-Time Communication)**: is a technology that enables real-time communication capabilities (like video and audio calling) in web browsers and mobile applications.



# Feature Deep Dive:

## 1. Friends & Friend Requests:

**Challenges**: Managing friendships and friend requests is a nuanced task. It's essential to ensure that users can send, accept, or decline friend requests seamlessly. Additionally, handling scenarios like duplicate requests, blocking users, and unfriending requires careful consideration.

**Solutions**: The backend provides distinct models and controllers for friends and friend requests. This separation ensures that each aspect of the friendship feature is handled independently. For instance, when a friend request is accepted, the backend automatically creates a new friendship record and deletes the friend request.
```ruby
class FriendsChannel < ApplicationCable::Channel
  def subscribed
    stream_for current_user
  end

  def speak(data)
    friend = User.find_by(id: data['friend_id'])
    if friend
      FriendsChannel.broadcast_to(friend, { type: 'FRIEND_ONLINE', friend_id: current_user.id })
    end
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end

```

```ruby
 FriendsChannel.broadcast_to(
          @request.sender,
          type: "ADD_FRIEND",
          **from_template("api/friends/show", friendship: @friendship, friend: current_user),
        )
              FriendsChannel.broadcast_to(
        @receiver,
        type: "ADD_INCOMING_REQUEST",
        **from_template("api/friend_requests/show", friend_request: @friend_request, user: current_user),
      )

        FriendsChannel.broadcast_to(
            @request.sender,
            type: "ADD_OUTGOING_REQUEST",
            **from_template("api/friend_requests/show", friend_request: @friend_request, user: current_user),
        )

        FriendsChannel.broadcast_to(
            @receiver,
            type: "REMOVE_INCOMING_REQUEST",
            **from_template("api/friend_requests/show", friend_request: @friend_request, user: current_user),
        )

        FriendsChannel.broadcast_to(
            @request.sender,
            type: "REMOVE_OUTGOING_REQUEST",
            **from_template("api/friend_requests/show", friend_request: @friend_request, user: current_user),
        )

        FriendsChannel.broadcast_to(
            @receiver,
            type: "REMOVE_FRIEND",
            **from_template("api/friends/show", friendship: @friendship, friend: current_user),
        )

        FriendsChannel.broadcast_to(
            @request.sender,
            type: "FRIEND_ONLINE",
            friend_id: @receiver.id
        )

        FriendsChannel.broadcast_to(
            @receiver,
            type: "FRIEND_OFFLINE",
            friend_id: @request.sender.id
        )
```

```javascript
 useEffect(() => {
    if (sessionUser) {
      dispatch(setSelectedServer("home"));
      dispatch(fetchFriends());
      dispatch(fetchFriendRequests());
    }

    const friendSubscription = consumer.subscriptions.create(
      { channel: "FriendsChannel" },
      {
        received: ({ type, friend, friendRequest, id }) => {
          switch (type) {
            case "UPDATE_FRIEND":
              dispatch(addFriend(friend));
              break;
            case "DELETE_FRIEND":
              dispatch(removeFriend(id));
              break;
            case "ADD_FRIEND":
              dispatch(addFriend(friend));
              break;
            case "DELETE_SENT_REQUEST":
              dispatch(removeSentRequest(id));
              break;
            case "UPDATE_SENT_REQUEST":
              dispatch(addSentRequest(friendRequest));
              break;
            case "ADD_INCOMING_REQUEST":
              dispatch(addReceivedRequest(friendRequest));
              break;
            case "DELETE_INCOMING_REQUEST":
              dispatch(removeReceivedRequest(id));
              break;
            case "UPDATE_INCOMING_REQUEST":
              dispatch(addReceivedRequest(friendRequest));
              break;
            default:
            // console.log("unknown broadcast type");
          }
        },
      }
    );

    return () => {
      friendSubscription?.unsubscribe();
      dispatch(resetFriends());
      dispatch(resetFriendRequests());
      dispatch(setAnimateOfflineFriends(false));
    };
  }, [dispatch]);


```

## 2.Direct Messaging & Conversations:

**Challenges**: Implementing a real-time direct messaging system requires managing private conversations between users, ensuring data privacy, and delivering messages in real-time.

**Solutions**: Conversations are modeled as private channels between two users. When a message is sent, it's associated with a specific conversation. ActionCable ensures that messages are delivered in real-time to both participants. The backend also ensures that only participants of a conversation can access its messages.

```ruby


class ConversationsChannel < ApplicationCable::Channel
  def subscribed
    @conversation = Conversation.find_by(id: params[:id])
    stream_for @conversation
  end

  def speak(data)
    message = @conversation.direct_messages.create(body: data['message'], user_id: data['user_id'])
    socket = { message: message.body, user_id: message.user_id }
    ConversationsChannel.broadcast_to(@conversation, socket)
  end


  def load(data)
    messages = @conversation.direct_messages.order(created_at: :desc).limit(100).reverse
    socket = { messages: messages }
    ConversationsChannel.broadcast_to(@conversation, socket)
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end

      ConversationsChannel.broadcast_to(@conversation, type: "NEW_DIRECT_MESSAGE", **from_template("api/direct_messages/show", direct_message: @direct_message))
            ConversationsChannel.broadcast_to(@conversation, type: "UPDATE_DIRECT_MESSAGE", **from_template("api/direct_messages/show", direct_message: @direct_message))


```

```javascript


   useEffect(() => {
    const convoSubscription = consumer.subscriptions.create(
      { channel: "ConversationsChannel", id: conversationId },
      {
        received: ({ type, message, id, direct_message }) => {
          switch (type) {
            case "NEW_DIRECT_MESSAGE":
              const listEle = document.querySelector(".messages-list");
              const atBottom =
                listEle &&
                Math.round(listEle.scrollHeight - listEle.scrollTop) <=
                  listEle.clientHeight;
              console.log(message);
              dispatch(receiveDirectMessage(message));

              if (message.author.id === sessionUser.id || atBottom)
                dispatch(setScroll(true));
              break;
            case "DESTROY_DIRECT_MESSAGE":
              dispatch(deleteDirectMessage(id));
              break;
            case "UPDATE_DIRECT_MESSAGE":
              dispatch(updateDirectMessage(message));
              break;
            default:
            // console.log("unknown broadcast type");
          }
        },
      }
    );

    return () => {
      convoSubscription?.unsubscribe();
      dispatch(resetDirectMessages());
      dispatch(setScroll(true));
    };
  }, [dispatch, conversationId]);


```
## 3. Video Calling:

**Challenges**: Implementing video calling requires handling video and audio streams, signaling between users to establish a connection, and ensuring good call quality.

**Solutions**: Once signaling is done, a direct peer-to-peer connection can be established for the video and audio streams.

```ruby
# app/channels/call_channel.rb
class CallChannel < ApplicationCable::Channel
  def subscribed
    stream_from "call_channel_#{params[:room]}"
  end

  def send_signal(data)
    ActionCable.server.broadcast("call_channel_#{params[:room]}", data)
  end
end
```
```javascript
  // Setting up the WebRTC peer connection
const configuration = { iceServers: [{ urls: '' }] };
const peerConnection = new RTCPeerConnection(configuration);

// Getting user media (video and audio)
navigator.mediaDevices.getUserMedia({ video: true, audio: true })
  .then(stream => {
    localVideo.srcObject = stream;
    stream.getTracks().forEach(track => peerConnection.addTrack(track, stream));
  });

// Handling signaling with ActionCable
const callChannel = consumer.subscriptions.create({ channel: "CallChannel", room: "ROOM_ID" }, {
  received(data) {

  }
});

// To send a signal (e.g., offer, answer, ice candidates)
callChannel.send_signal({ type: 'OFFER', data: offer });
```
