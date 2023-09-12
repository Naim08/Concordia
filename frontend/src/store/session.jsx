import csrfFetch from "./csrf";
// action types
export const SET_CURRENT_USER = "session/SET_CURRENT_USER";
export const REMOVE_CURRENT_USER = "session/REMOVE_CURRENT_USER";

// action creators
export const setCurrentUser = (user) => {
  return {
    type: SET_CURRENT_USER,
    user,
  };
};

export const removeCurrentUser = (userId) => {
  return {
    type: REMOVE_CURRENT_USER,
    userId,
  };
};

// Thunk action creators
export const loginUser = (user) => async (dispatch) => {
  try {
    let res = await csrfFetch("/api/session", {
      method: "POST",
      body: JSON.stringify(user),
    });

    if (res.ok) {
      let data = await res.json();
      if (data.errors) throw data;

      storeCurrentUser(data.user);
      dispatch(setCurrentUser(data.user));
    } else {
      throw res;
    }
  } catch (error) {
    // let errors = await error.json();
    throw error;
  }
};

export const logoutUser = (userId) => async (dispatch) => {
  let res = await csrfFetch("/api/session", { method: "DELETE" });

  if (res.ok) {
    sessionStorage.setItem("currentUserId", null);
    dispatch(removeCurrentUser(userId));
  }
};

export const signupUser = (user) => async (dispatch) => {
  try {
    let res = await csrfFetch("/api/users", {
      method: "POST",
      body: JSON.stringify(user),
    });

    if (res.ok) {
      let data = await res.json();
      if (data.errors) throw data;
      storeCurrentUser(data.user);
      dispatch(setCurrentUser(data.user));
    } else {
      throw res;
    }
  } catch (error) {
    let errors = await error.json();
    throw errors;
  }
};

export const restoreSession = () => async (dispatch) => {
  let res = await csrfFetch("/api/session");

  if (res.ok) {
    storeCSRFToken(res);
    let data = await res.json();
    storeCurrentUser(data.user);
    dispatch(setCurrentUser(data.user));
  }
};

// Helper Functions
const storeCurrentUser = (user) => {
  if (user) {
    sessionStorage.setItem("currentUserId", JSON.stringify(user.id));
  } else {
    sessionStorage.removeItem("currentUserId");
  }
};

const storeCSRFToken = (response) => {
  const csrfToken = response.headers.get("X-CSRF-Token");
  if (csrfToken) sessionStorage.setItem("X-CSRF-Token", csrfToken);
};

// Reducer
const initialState = {
  currentUserId: JSON.parse(sessionStorage.getItem("currentUserId")),
};
const sessionReducer = (state = initialState, action) => {
  let nextState = { ...state };
  switch (action.type) {
    case SET_CURRENT_USER:
      if (action.user) {
        nextState["currentUserId"] = action.user.id;
      } else {
        nextState["currentUserId"] = null;
      }
      return nextState;
    case REMOVE_CURRENT_USER:
      nextState["currentUserId"] = null;
      return nextState;
    default:
      return state;
  }
};

export default sessionReducer;
