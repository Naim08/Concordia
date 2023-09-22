import usersReducer from "./user";
import { combineReducers } from "redux";
import serversReducer from "./server";
import channelsReducer from "./channel";
import membersReducer from "./member";
import friendsReducer from "./friend";
import messagesReducer from "./message";

const entitiesReducer = combineReducers({
  user: usersReducer,
  servers: serversReducer,
  channels: channelsReducer,
  members: membersReducer,
  friends: friendsReducer,
  messages: messagesReducer,
});

export default entitiesReducer;
