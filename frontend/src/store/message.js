import csrfFetch from "./csrf";
import { unauthorizedSession } from "./session";
import { setHomeRedirect } from "./ui";

const RESET_MESSAGES = "messages/resetMessages";
const SET_MESSAGES = "messages/setMessages";
const ADD_MESSAGE = "messages/addMessage";
const REMOVE_MESSAGE = "messages/removeMessage";
const REMOVE_USER_MESSAGES = "messages/removeUserMessages";

export const resetMessages = () => ({
  type: RESET_MESSAGES,
});

const setMessages = (messages) => ({
  type: SET_MESSAGES,
  messages,
});

export const addMessage = (message) => ({
  type: ADD_MESSAGE,
  message,
});

export const removeMessage = (messageId) => ({
  type: REMOVE_MESSAGE,
  messageId,
});

export const removeUserMessages = (authorId) => ({
  type: REMOVE_USER_MESSAGES,
  authorId,
});
export const getMessages = (state) => {
  return state.entities.messages
    ? Object.values(state.entities.messages)
    : null;
};

export const getMessage = (id) => (state) => {
  return state.entities.messages ? state.entities.messages[id] : null;
};

export const fetchMessages = (channelId) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/channels/${channelId}/messages`);

    const data = await response.json();
    dispatch(setMessages(data.messages));
  } catch (res) {
    if (res.status === 401) dispatch(unauthorizedSession());
    else dispatch(setHomeRedirect(true));
  }
};

export const createMessage = (message) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/messages`, {
      method: "POST",
      body: JSON.stringify(message),
    });

    return response;
  } catch (res) {
    if (res.status === 401) dispatch(unauthorizedSession());
  }
};

export const deleteMessage = (messageId) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/messages/${messageId}`, {
      method: "DELETE",
    });

    return response;
  } catch (res) {
    if (res.status === 401) dispatch(unauthorizedSession());
  }
};

export const updateMessage = (message) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/messages/${message.id}`, {
      method: "PATCH",
      body: JSON.stringify(message),
    });

    // update message dispatch handled with broadcast subscription
    return response;
  } catch (res) {
    if (res.status === 401) dispatch(unauthorizedSession());
  }
};

const initialState = null;

const messagesReducer = (state = initialState, action) => {
  const newState = { ...state };

  switch (action.type) {
    case RESET_MESSAGES:
      return initialState;
    case SET_MESSAGES:
      return { ...action.messages };
    case ADD_MESSAGE:
      return { ...state, [action.message.id]: action.message };
    case REMOVE_MESSAGE:
      delete newState[action.messageId];
      return newState;
    case REMOVE_USER_MESSAGES:
      for (const [id, message] of Object.entries(newState)) {
        if (message.authorId === action.authorId) delete newState[id];
      }
      return newState;
    default:
      return state;
  }
};

export default messagesReducer;
