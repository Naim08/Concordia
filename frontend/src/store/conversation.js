import csrfFetch from "./csrf";
import { addErrors } from "./errors";
import { unauthorizedSession } from "./session";
import { createSelector } from "reselect";
import { setNewConversationId } from "./ui";

const conversationsObjectSelector = (state) => state.entities.conversations;
export const RECEIVE_CONVERSATION_PARTICIPATION =
  "conversationParticipation/RECEIVE_CONVERSATION_PARTICIPATION";
export const REMOVE_CONVERSATION_PARTICIPATION =
  "conversationParticipation/REMOVE_CONVERSATION_PARTICIPATION";
export const RECEIVE_CONVERSATION_PARTICIPATIONS =
  "conversationParticipation/RECEIVE_CONVERSATION_PARTICIPATIONS";
export const RECEIVE_CONVERSATIONS = "conversation/RECEIVE_CONVERSATIONS";
export const RECEIVE_CONVERSATION = "conversation/RECEIVE_CONVERSATION";
export const REMOVE_CONVERSATION = "conversation/REMOVE_CONVERSATION";

const receiveConversations = (conversations) => {
  return {
    type: RECEIVE_CONVERSATIONS,
    conversations: conversations,
  };
};

export const receiveConversation = (conversation) => {
  return {
    type: RECEIVE_CONVERSATION,
    conversation: conversation,
  };
};

export const removeConversation = (conversationId) => {
  return {
    type: REMOVE_CONVERSATION,
    conversationId: conversationId,
  };
};

const receiveConversationParticipation = (conversationParticipation) => {
  return {
    type: RECEIVE_CONVERSATION_PARTICIPATION,
    conversationParticipation: conversationParticipation,
  };
};

const removeConversationParticipation = (conversationParticipation) => {
  return {
    type: REMOVE_CONVERSATION_PARTICIPATION,
    conversationParticipation: conversationParticipation,
  };
};
const receiveConversationParticipations = (conversationParticipations) => {
  return {
    type: RECEIVE_CONVERSATION_PARTICIPATIONS,
    conversationParticipations: conversationParticipations,
  };
};

export const getConversations = createSelector(
  [conversationsObjectSelector],
  (conversationObjects) =>
    conversationObjects ? Object.values(conversationObjects) : []
);
export const getConversation = (id) => (state) => {
  return state.entities.conversations ? state.entities.conversations[id] : null;
};

export const createConversationParticipation =
  (conversationParticipant) => async (dispatch) => {
    try {
      const response = await csrfFetch("/api/conversation_participants", {
        method: "POST",
        body: JSON.stringify({ conversationParticipant }),
      });

      if (response.ok) {
        const conversation = await response.json();
        dispatch(receiveConversationParticipation(conversation));
      } else {
        if (response.status === 401) {
          dispatch(unauthorizedSession());
        } else {
          const errors = await response.json();
          dispatch(addErrors(errors));
        }
      }
    } catch (error) {
      dispatch(addErrors([error.message]));
    }
  };
export const getConversationParticipations =
  (conversationParticipant) => async (dispatch) => {
    try {
      const response = await csrfFetch(
        `/api/conversation_participants/${conversationParticipant.participantId}`,
        {
          method: "GET",
        }
      );

      if (response.ok) {
        const conversation = await response.json();
        dispatch(receiveConversationParticipations(conversation));
      } else {
        if (response.status === 401) {
          dispatch(unauthorizedSession());
        } else {
          const errors = await response.json();
          dispatch(addErrors(errors));
        }
      }
    } catch (error) {
      dispatch(addErrors([error.message]));
    }
  };

export const fetchConversations = () => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/conversations`);

    if (response.ok) {
      const conversation = await response.json();
      dispatch(receiveConversations(conversation));
    } else {
      if (response.status === 401) {
        dispatch(unauthorizedSession());
      } else {
        const errors = await response.json();
        dispatch(addErrors(errors));
      }
    }
  } catch (error) {
    dispatch(addErrors([error.message]));
  }
};

export const deleteConversationParticipation =
  (conversationParticipation) => async (dispatch) => {
    try {
      const response = await csrfFetch(
        `/api/conversation_participants/${conversationParticipation.id}`,
        {
          method: "DELETE",
          body: JSON.stringify({
            conversation_participant: conversationParticipation,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        dispatch(removeConversationParticipation(conversationParticipation));
      } else {
        if (response.status === 401) {
          dispatch(unauthorizedSession());
        } else {
          const errors = await response.json();
          dispatch(addErrors(errors));
        }
      }
    } catch (error) {
      dispatch(addErrors([error.message]));
    }
  };

export const fetchConversation = (conversationId) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/conversations/${conversationId}`);

    if (response.ok) {
      const conversation = await response.json();
      dispatch(receiveConversation(conversation));
    } else {
      if (response.status === 401) {
        dispatch(unauthorizedSession());
      } else {
        const errors = await response.json();
        dispatch(addErrors(errors));
      }
    }
  } catch (error) {
    dispatch(addErrors([error.message]));
  }
};

export const createConversation = (participantId) => async (dispatch) => {
  try {
    const response = await csrfFetch("/api/conversations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ participant_id: participantId }),
    });

    if (response.ok) {
      const conversation = await response.json();

      dispatch(receiveConversation(conversation));
      dispatch(setNewConversationId(Object.keys(conversation)[0]));
    } else {
      if (response.status === 401) {
        dispatch(unauthorizedSession());
      } else {
        const errors = await response.json();
        dispatch(addErrors(errors));
      }
    }
  } catch (error) {
    dispatch(addErrors([error.message]));
  }
};

export const deleteConversation = (conversationId) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/conversations/${conversationId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      dispatch(removeConversation(conversationId));
    } else {
      if (response.status === 401) {
        dispatch(unauthorizedSession());
      } else {
        const errors = await response.json();
        dispatch(addErrors(errors));
      }
    }
  } catch (error) {
    dispatch(addErrors([error.message]));
  }
};

const conversationsReducer = (state = {}, action) => {
  // console.log(action)
  Object.freeze(state);

  let newState;
  switch (action.type) {
    case RECEIVE_CONVERSATIONS:
      return Object.assign({}, action.conversations);
    case RECEIVE_CONVERSATION:
      return { ...state, ...action.conversation };
    case REMOVE_CONVERSATION:
      newState = Object.assign({}, state);
      delete newState[action.conversationId];
      return newState;
    case RECEIVE_CONVERSATION_PARTICIPATION:
      newState = Object.assign({}, state);
      action.conversationParticipation.participants.forEach((participant) => {
        if (newState[participant.conversationId]) {
          newState[participant.conversationId].participants =
            action.conversationParticipation.participants;
        }
      });
      return newState;
    default:
      return state;
  }
};

export const conversationParticipationReducer = (state = {}, action) => {
  Object.freeze(state);
  const newState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_CONVERSATION_PARTICIPATION:
      action.conversationParticipation.participants.forEach((participant) => {
        newState[participant.id] = participant;
      });
      return newState;
    case REMOVE_CONVERSATION_PARTICIPATION:
      delete newState[action.conversationParticipation.id];
      return newState;
    case RECEIVE_CONVERSATION_PARTICIPATIONS:
      return { ...action.conversationParticipations };
    case RECEIVE_CONVERSATIONS:
      for (const key in action.conversations) {
        const conversation = action.conversations[key];
        for (const id in conversation.conversationParticipant) {
          newState[id] = conversation.conversationParticipant[id];
        }
      }
      return newState;
    default:
      return state;
  }
};

export default conversationsReducer;
