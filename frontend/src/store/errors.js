const ADD_ERRORS = "errors/addErrors";
const REMOVE_ERRORS = "errors/removeErrors";

export const addErrors = (errors) => ({
  type: ADD_ERRORS,
  errors,
});

export const removeErrors = () => ({
  type: REMOVE_ERRORS,
});

export const getErrors = (state) => {
  return state.errors?.messages ? state.errors.messages : null;
};

export const getErrorStatus = (state) => {
  return state.errors?.status ? state.errors.status : null;
};

const initialState = {
  status: null,
  messages: null,
};

const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ERRORS:
      return { ...action.errors };
    case REMOVE_ERRORS:
      return { ...initialState };
    default:
      return state;
  }
};

export default errorReducer;
