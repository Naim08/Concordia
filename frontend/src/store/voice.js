// voiceChatReducer.js

import createRoom from "../utils/createRoom";
// Initial States and Action Types
const initialState = {
  isInVoiceChat: false,
  currentRoom: null,
  voiceChatError: null,
  voiceChatUsers: [],
  voiceChatState: "STATE_IDLE", // Initialize with STATE_IDLE
};

const JOIN_VOICE_CHAT = "voiceChat/JOIN_VOICE_CHAT";
const LEAVE_VOICE_CHAT = "voiceChat/LEAVE_VOICE_CHAT";
const UPDATE_VOICE_CHAT_USERS = "voiceChat/UPDATE_VOICE_CHAT_USERS";
const VOICE_CHAT_ERROR = "voiceChat/VOICE_CHAT_ERROR";
const SET_VOICE_CHAT_STATE = "voiceChat/SET_VOICE_CHAT_STATE";
const RESET_VOICE_CHAT = "voiceChat/RESET_VOICE_CHAT";
const STATE_IDLE = "voiceChat/STATE_IDLE";

// Reducer
const voiceChatReducer = (state = initialState, action) => {
  switch (action.type) {
    case JOIN_VOICE_CHAT:
      return {
        ...state,
        isInVoiceChat: true,
        currentRoom: action.payload.roomId,
        voiceChatUsers: action.payload.users,
        voiceChatState: "STATE_JOINED",
      };
    case LEAVE_VOICE_CHAT:
      return {
        ...state,
        isInVoiceChat: false,
        currentRoom: null,
        voiceChatUsers: [],
        voiceChatState: "STATE_IDLE",
      };
    case UPDATE_VOICE_CHAT_USERS:
      return {
        ...state,
        voiceChatUsers: action.payload.users,
      };
    case VOICE_CHAT_ERROR:
      return {
        ...state,
        voiceChatError: action.payload.error,
        voiceChatState: "STATE_ERROR",
      };
    case SET_VOICE_CHAT_STATE:
      return {
        ...state,
        voiceChatState: action.payload.state,
      };
    default:
      return state;
  }
};

export const joinVoiceChat = () => async (dispatch) => {
  try {
    dispatch(setVoiceChatState("STATE_CREATING"));

    const roomData = await createRoom();

    dispatch({
      type: JOIN_VOICE_CHAT,
      payload: {
        roomId: roomData.name, // Assuming the room name is returned as 'name'
        users: [], // Initially, the room will be empty. You can manage users separately.
      },
    });
  } catch (error) {
    dispatch({
      type: VOICE_CHAT_ERROR,
      payload: {
        error: "Failed to join voice chat.",
      },
    });
  }
};

export const leaveVoiceChat = () => ({
  type: LEAVE_VOICE_CHAT,
});

export const updateVoiceChatUsers = (users) => ({
  type: UPDATE_VOICE_CHAT_USERS,
  payload: {
    users,
  },
});

export const setVoiceChatError = (error) => ({
  type: VOICE_CHAT_ERROR,
  payload: {
    error,
  },
});

export const setVoiceChatState = (state) => ({
  type: SET_VOICE_CHAT_STATE,
  payload: {
    state,
  },
});

export const getVoiceChatError = (state) =>
  state.entities.voiceChat.voiceChatError;

export default voiceChatReducer;
