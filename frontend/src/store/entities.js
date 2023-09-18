import usersReducer from "./user";
import { combineReducers } from "redux";
import serversReducer from "./server";

const entitiesReducer = combineReducers({
  user: usersReducer,
  servers: serversReducer,
});

export default entitiesReducer;
