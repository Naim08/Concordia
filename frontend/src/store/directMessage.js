import csrfFetch from "./csrf";
import { addErrors } from "./errors";
import { unauthorizedSession } from "./session";
import { RECEIVE_CONVERSATION } from "./conversation";

export const RECEIVE_DIRECT_MESSAGE = "directMessage/RECEIVE_DIRECT_MESSAGE";
export const REMOVE_DIRECT_MESSAGE = "directMessage/REMOVE_DIRECT_MESSAGE";

const receiveDirectMessage = (directMessage) => {
  return {
    type: RECEIVE_DIRECT_MESSAGE,
    directMessage: directMessage,
  };
};

const removeDirectMessage = (directMessageId) => {
  return {
    type: REMOVE_DIRECT_MESSAGE,
    directMessageId: directMessageId,
  };
};

export const fetchDirectMessage = (directMessageId) => async (dispatch) => {
  try {
    const response = await csrfFetch(`api/direct_messages/${directMessageId}`);

    if (response.ok) {
      const directMessage = await response.json();
      dispatch(receiveDirectMessage(directMessage));
    } else if (response.status === 401) {
      dispatch(unauthorizedSession());
    } else {
      const errors = await response.json();
      dispatch(addErrors(errors));
    }
  } catch (error) {
    dispatch(addErrors([error.message]));
  }
};

export const createDirectMessage =
  (conversationId, directMessage) => async (dispatch) => {
    try {
      const response = await csrfFetch(
        `api/conversations/${conversationId}/direct_messages`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ direct_message: directMessage }),
        }
      );

      if (response.ok) {
        const newDirectMessage = await response.json();
        dispatch(receiveDirectMessage(newDirectMessage));
      } else if (response.status === 401) {
        dispatch(unauthorizedSession());
      } else {
        const errors = await response.json();
        dispatch(addErrors(errors));
      }
    } catch (error) {
      dispatch(addErrors([error.message]));
    }
  };

export const updateDirectMessage = (directMessage) => async (dispatch) => {
  try {
    const response = await csrfFetch(
      `api/direct_messages/${directMessage.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ direct_message: directMessage }),
      }
    );

    if (response.ok) {
      const updatedDirectMessage = await response.json();
      dispatch(receiveDirectMessage(updatedDirectMessage));
    } else if (response.status === 401) {
      dispatch(unauthorizedSession());
    } else {
      const errors = await response.json();
      dispatch(addErrors(errors));
    }
  } catch (error) {
    dispatch(addErrors([error.message]));
  }
};

export const deleteDirectMessage = (directMessageId) => async (dispatch) => {
  try {
    const response = await csrfFetch(`api/direct_messages/${directMessageId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      dispatch(removeDirectMessage(directMessageId));
    } else if (response.status === 401) {
      dispatch(unauthorizedSession());
    } else {
      const errors = await response.json();
      dispatch(addErrors(errors));
    }
  } catch (error) {
    dispatch(addErrors([error.message]));
  }
};

const directMessagesReducer = (state = {}, action) => {
  Object.freeze(state);

  let newState;
  switch (action.type) {
    case RECEIVE_DIRECT_MESSAGE:
      newState = Object.assign({}, state);
      newState[action.directMessage.id] = action.directMessage;
      return newState;
    case REMOVE_DIRECT_MESSAGE:
      newState = Object.assign({}, state);
      delete newState[action.directMessageId];
      return newState;
    case RECEIVE_CONVERSATION:
      if (action.conversation.direct_messages)
        return action.conversation.direct_messages;
      return {};
    default:
      return state;
  }
};

export default directMessagesReducer;

// ... other action types and action creators ...
