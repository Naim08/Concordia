import csrfFetch from "./csrf";
import { addErrors } from "./errors";
import { resetUi, setUnauthorized } from "./ui";

export const SET_CURRENT_USER = "session/setCurrentUser";
export const REMOVE_CURRENT_USER = "session/removeCurrentUser";

const setCurrentUser = (user) => ({
  type: SET_CURRENT_USER,
  user,
});

const removeCurrentUser = () => ({
  type: REMOVE_CURRENT_USER,
});

const storeCSRFToken = (response) => {
  const csrfToken = response.headers.get("X-CSRF-Token");
  if (csrfToken) sessionStorage.setItem("X-CSRF-Token", csrfToken);
};

const storeCurrentUser = (user) => {
  user
    ? sessionStorage.setItem("currentUser", JSON.stringify(user))
    : sessionStorage.removeItem("currentUser");
};

export const getCurrentUser = (state) => {
  return state.session.user;
};

export const login = (loginInfo) => async (dispatch) => {
  try {
    const response = await csrfFetch("/api/session", {
      method: "POST",
      body: JSON.stringify(loginInfo),
    });

    const data = await response.json();
    storeCurrentUser(data.user);
    dispatch(setCurrentUser(data.user));

    return response;
  } catch (res) {
    const data = await res.clone().json();

    const errors = {
      status: res.status,
      messages: null,
    };

    if (data?.errors) errors.messages = data.errors;
    dispatch(addErrors(errors));
  }
};

export const signup = (user) => async (dispatch) => {
  try {
    const response = await csrfFetch("/api/users", {
      method: "POST",
      body: JSON.stringify(user),
    });

    const data = await response.json();
    storeCurrentUser(data.user);
    dispatch(setCurrentUser(data.user));

    return response;
  } catch (res) {
    const data = await res.clone().json();

    const errors = {
      status: res.status,
      messages: null,
    };

    if (data?.errors) errors.messages = data.errors;
    dispatch(addErrors(errors));
  }
};

export const logout = () => async (dispatch) => {
  try {
    const response = await csrfFetch("/api/session", {
      method: "DELETE",
    });

    storeCurrentUser(null);
    dispatch(removeCurrentUser());
    dispatch(resetUi());

    return response;
  } catch (res) {
    if (res.status === 401) dispatch(unauthorizedSession());
  }
};

export const unauthorizedSession = () => async (dispatch) => {
  storeCurrentUser(null);
  dispatch(removeCurrentUser());
  dispatch(resetUi());
  dispatch(setUnauthorized(true));
};

export const restoreSession = () => async (dispatch) => {
  const response = await csrfFetch("/api/session");

  storeCSRFToken(response);
  const data = await response.json();
  storeCurrentUser(data.user);
  dispatch(setCurrentUser(data.user));
  return response;
};

const initialState = {
  user: JSON.parse(sessionStorage.getItem("currentUser")),
};

const sessionReducer = (state = initialState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case SET_CURRENT_USER:
      return { ...state, user: action.user };
    case REMOVE_CURRENT_USER:
      return { ...state, user: null };
    default:
      return state;
  }
};

export default sessionReducer;
