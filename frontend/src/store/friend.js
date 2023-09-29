import csrfFetch from "./csrf";
import { unauthorizedSession } from "./session";
import { createSelector } from "reselect";

const friendsObjectSelector = (state) => state.entities.friends;
const RESET_FRIENDS = "friends/resetFriends";
const SET_FRIENDS = "friends/setFriends";
const ADD_FRIEND = "friends/addFriend";
const REMOVE_FRIEND = "friends/removeFriend";

export const resetFriends = () => ({
  type: RESET_FRIENDS,
});

const setFriends = (friends) => ({
  type: SET_FRIENDS,
  friends,
});

export const addFriend = (friend) => ({
  type: ADD_FRIEND,
  friend,
});

export const removeFriend = (friendshipId) => ({
  type: REMOVE_FRIEND,
  friendshipId,
});

export const getFriends = createSelector([friendsObjectSelector], (friends) => {
  return friends
    ? Object.values(friends).sort((a, b) => (a.username > b.username ? 1 : -1))
    : [];
});

export const fetchFriends = () => async (dispatch) => {
  try {
    const response = await csrfFetch("/api/friends");

    const data = await response.json();
    dispatch(setFriends(data.friends));
  } catch (res) {
    if (res.status === 401) dispatch(unauthorizedSession());
  }
};

export const deleteFriend = (friendshipId) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/friends/${friendshipId}`, {
      method: "DELETE",
    });

    dispatch(removeFriend(friendshipId));
    return response;
  } catch (res) {
    if (res.status === 401) dispatch(unauthorizedSession());
  }
};

const initialState = null;

const friendsReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_FRIENDS:
      return initialState;
    case SET_FRIENDS:
      return { ...action.friends };
    case ADD_FRIEND:
      return { ...state, [action.friend.friendshipId]: action.friend };
    case REMOVE_FRIEND:
      const newState = { ...state };
      delete newState[action.friendshipId];
      return newState;
    default:
      return state;
  }
};

export default friendsReducer;
