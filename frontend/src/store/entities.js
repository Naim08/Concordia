import usersReducer from "./user";
import { combineReducers } from "redux";

const entitiesReducer = combineReducers({
  user: usersReducer,
});

export default entitiesReducer;
