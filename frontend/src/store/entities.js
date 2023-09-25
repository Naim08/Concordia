import usersReducer from "./user";
import { combineReducers } from "redux";
import serversReducer from "./server";
import channelsReducer from "./channel";
import membersReducer from "./member";
import friendsReducer from "./friend";
import messagesReducer from "./message";
import directMessagesReducer from "./directMessage";
import conversationsReducer from "./conversation";
import { conversationParticipationReducer } from "./conversation";
import friendRequestsReducer from "./friendRequest";

const entitiesReducer = combineReducers({
  user: usersReducer,
  servers: serversReducer,
  channels: channelsReducer,
  members: membersReducer,
  friends: friendsReducer,
  messages: messagesReducer,
  directMessages: directMessagesReducer,
  conversations: conversationsReducer,
  conversationParticipation: conversationParticipationReducer,
  friendRequests: friendRequestsReducer,
});

export default entitiesReducer;
