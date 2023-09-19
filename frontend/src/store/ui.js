import { combineReducers } from "redux";

const RESET_UI = "ui/reset";
const SET_UNAUTHORIZED = "ui/setUnauthorized";
const SET_HOME_REDIRECT = "ui/setHomeRedirect";

// navbar
const SET_FRIEND_NAV_TAB = "ui/setFriendNavTab";
const SET_SELECTED_SERVER = "ui/setSelectedServer";

// modal
const SET_SHOW_SERVER_MODAL = "ui/setShowServerModal";
const SET_SHOW_SERVER_ADMIN_MODAL = "ui/setShowServerAdminModal";
const SET_LEAVE_SERVER_MODAL = "ui/setLeaveServerModal";
const SET_CREATE_CHANNEL_MODAL = "ui/setCreateChannelModal";
const SET_SERVER_FORM_PAGE = "ui/setServerFormPage";
const SET_SERVER_FORM_SLIDE = "ui/setServerFormSlide";
const SET_SERVER_ADMIN_TAB = "ui/setSelectedServerAdminTab";
const SET_BACKGROUND = "ui/setBackground";

// forms and feedback

const SET_ADD_FRIEND_RESULT = "ui/setAddFriendResult";
const SET_FRIEND_SEARCH = "ui/setFriendSearch";

// animation
const SET_SHOW_MEMBERS = "ui/setShowMembers";
const SET_SCROLL = "ui/setScroll";
const SET_ANIMATE_OFFLINE_FRIENDS = "ui/setAnimateOfflineFriends";

//edit and delete
const SET_EDIT_MESSAGE_ID = "ui/setEditMessageId";
const SET_DELETED_SERVER_ID = "ui/setDeletedServerId";
const SET_DELETED_CHANNEL_ID = "ui/setDeletedChannelId";
const SET_QUICK_DELETE = "ui/setQuickDelete";
const SET_CHANNEL_SETTINGS_ID = "ui/setChannelSettingsId";
const SET_NEW_SERVER = "ui/setNewServer";
const SET_NEW_CHANNEL = "ui/setNewChannel";

export const resetUi = () => ({
  type: RESET_UI,
});

export const setUnauthorized = (toggle) => ({
  type: SET_UNAUTHORIZED,
  toggle,
});

export const setHomeRedirect = (toggle) => ({
  type: SET_HOME_REDIRECT,
  toggle,
});

export const setFriendNav = (selectedTab) => ({
  type: SET_FRIEND_NAV_TAB,
  selectedTab,
});

export const setSelectedServer = (selectedServer) => ({
  type: SET_SELECTED_SERVER,
  selectedServer,
});

export const setShowMembers = (toggle) => ({
  type: SET_SHOW_MEMBERS,
  toggle,
});

export const setAddFriendResult = (result) => ({
  type: SET_ADD_FRIEND_RESULT,
  result,
});

export const setScroll = (toggle) => ({
  type: SET_SCROLL,
  toggle,
});

export const setShowServerModal = (toggle) => ({
  type: SET_SHOW_SERVER_MODAL,
  toggle,
});

export const setServerFormPage = (formType) => ({
  type: SET_SERVER_FORM_PAGE,
  formType,
});

export const setServerFormSlide = (direction) => ({
  type: SET_SERVER_FORM_SLIDE,
  direction,
});

export const setAnimateOfflineFriends = (toggle) => ({
  type: SET_ANIMATE_OFFLINE_FRIENDS,
  toggle,
});

export const setNewServer = (serverId) => ({
  type: SET_NEW_SERVER,
  serverId,
});

export const setNewChannel = (channelId) => ({
  type: SET_NEW_CHANNEL,
  channelId,
});

export const setFriendSearch = (toggle) => ({
  type: SET_FRIEND_SEARCH,
  toggle,
});

export const setEditMessageId = (id) => ({
  type: SET_EDIT_MESSAGE_ID,
  id,
});

export const setShowServerAdminModal = (toggle) => ({
  type: SET_SHOW_SERVER_ADMIN_MODAL,
  toggle,
});

export const setServerAdminTab = (tab) => ({
  type: SET_SERVER_ADMIN_TAB,
  tab,
});

export const setChannelSettingsId = (channelId) => ({
  type: SET_CHANNEL_SETTINGS_ID,
  channelId,
});

export const setLeaveServerModal = (toggle) => ({
  type: SET_LEAVE_SERVER_MODAL,
  toggle,
});

export const setCreateChannelModal = (toggle) => ({
  type: SET_CREATE_CHANNEL_MODAL,
  toggle,
});

export const setDeletedServerId = (id) => ({
  type: SET_DELETED_SERVER_ID,
  id,
});

export const setDeletedChannelId = (id) => ({
  type: SET_DELETED_CHANNEL_ID,
  id,
});

export const setQuickDelete = (toggle) => ({
  type: SET_QUICK_DELETE,
  toggle,
});

export const setBackground = (toggle) => ({
  type: SET_BACKGROUND,
  toggle,
});
export const getUnauthorized = (state) => {
  return state.ui.auth.unauthorized;
};

export const getHomeRedirect = (state) => {
  return state.ui.auth.homeRedirect;
};

export const getSelectedFriendNavTab = (state) => {
  return state.ui.navbar.selectedFriendNavTab;
};

export const getSelectedServer = (state) => {
  return state.ui.navbar.selectedServer;
};

export const getAddFriendResult = (state) => {
  return state.ui.form.addFriendResult;
};

export const getShowMembersToggle = (state) => {
  return state.ui.animation.showMembers;
};

export const getSetScroll = (state) => {
  return state.ui.animation.setScroll;
};

export const getShowServerModal = (state) => {
  return state.ui.modal.showServerModal;
};

export const getServerFormType = (state) => {
  return state.ui.modal.serverFormType;
};

export const getServerSlide = (state) => {
  return state.ui.modal.serverSlide;
};

export const getAnimateOfflineFriends = (state) => {
  return state.ui.animation.animateOfflineFriends;
};

export const getNewServer = (state) => {
  return state.ui.editDelete.newServer;
};

export const getNewChannel = (state) => {
  return state.ui.editDelete.newChannel;
};

export const getFriendSearch = (state) => {
  return state.ui.form.friendSearch;
};

export const getEditMessageId = (state) => {
  return state.ui.editDelete.editMessageId;
};

export const getShowServerAdminModal = (state) => {
  return state.ui.modal.showServerAdminModal;
};

export const getServerAdminTab = (state) => {
  return state.ui.modal.serverAdminTab;
};

export const getChannelSettingsId = (state) => {
  return state.ui.editDelete.channelSettingsId;
};

export const getLeaveServerModal = (state) => {
  return state.ui.modal.showLeaveServerModal;
};

export const getCreateChannelModal = (state) => {
  return state.ui.modal.showCreateChannelModal;
};

export const getBackgroundState = (state) => {
  return state.ui.modal.background;
};

export const getDeletedServerId = (state) => {
  return state.ui.editDelete.deletedServerId;
};

export const getDeletedChannelId = (state) => {
  return state.ui.editDelete.deletedChannelId;
};

export const getQuickDelete = (state) => {
  return state.ui.editDelete.quickDelete;
};

const authInitialState = {
  unauthorized: false,
  homeRedirect: false,
};

const authUiReducer = (state = authInitialState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RESET_UI:
      return authInitialState;
    case SET_UNAUTHORIZED:
      return { ...state, unauthorized: action.value };
    case SET_HOME_REDIRECT:
      return { ...state, homeRedirect: action.value };
    default:
      return state;
  }
};

const navbarInitialState = {
  selectedFriendNavTab: "friends-online",
  selectedServer: "home",
};

const navbarUiReducer = (state = navbarInitialState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RESET_UI:
      return navbarInitialState;
    case SET_FRIEND_NAV_TAB:
      return { ...state, selectedFriendNavTab: action.selectedTab };
    case SET_SELECTED_SERVER:
      return { ...state, selectedServer: action.selectedServer };
    default:
      return state;
  }
};

const modalInitialState = {
  showServerModal: false,
  serverFormType: "start",
  serverSlide: "expand",
  showServerAdminModal: false,
  serverAdminTab: "Overview",
  showLeaveServerModal: false,
  showCreateChannelModal: false,
  background: false,
};

const modalUiReducer = (state = modalInitialState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RESET_UI:
      return modalInitialState;
    case SET_SHOW_SERVER_MODAL:
      return { ...state, showServerModal: action.toggle };
    case SET_SERVER_FORM_PAGE:
      return { ...state, serverFormType: action.formType };
    case SET_SERVER_FORM_SLIDE:
      return { ...state, serverSlide: action.direction };
    case SET_SHOW_SERVER_ADMIN_MODAL:
      return { ...state, showServerAdminModal: action.toggle };
    case SET_SERVER_ADMIN_TAB:
      return { ...state, serverAdminTab: action.tab };
    case SET_LEAVE_SERVER_MODAL:
      return { ...state, showLeaveServerModal: action.toggle };
    case SET_CREATE_CHANNEL_MODAL:
      return { ...state, showCreateChannelModal: action.toggle };
    case SET_BACKGROUND:
      return { ...state, background: action.toggle };
    default:
      return state;
  }
};

const formInitialState = {
  addFriendResult: false,
  friendSearch: false,
};

const formUiReducer = (state = formInitialState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RESET_UI:
      return formInitialState;
    case SET_ADD_FRIEND_RESULT:
      return { ...state, addFriendResult: action.result };
    case SET_FRIEND_SEARCH:
      return { ...state, friendSearch: action.toggle };
    default:
      return state;
  }
};

const animationInitialState = {
  showMembers: false,
  setScroll: true,
  animateOfflineFriends: false,
};

const animationUiReducer = (state = animationInitialState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RESET_UI:
      return animationInitialState;
    case SET_SHOW_MEMBERS:
      return { ...state, showMembers: action.toggle };
    case SET_SCROLL:
      return { ...state, setScroll: action.toggle };
    case SET_ANIMATE_OFFLINE_FRIENDS:
      return { ...state, animateOfflineFriends: action.toggle };
    default:
      return state;
  }
};

const editDeleteInitialState = {
  editMessageId: null,
  deletedServerId: null,
  deletedChannelId: null,
  quickDelete: false,
  channelSettingsId: null,
  newServer: null,
  newChannel: null,
};

const editDeleteUiReducer = (state = editDeleteInitialState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RESET_UI:
      return editDeleteInitialState;
    case SET_EDIT_MESSAGE_ID:
      return { ...state, editMessageId: action.id };
    case SET_DELETED_SERVER_ID:
      return { ...state, deletedServerId: action.id };
    case SET_DELETED_CHANNEL_ID:
      return { ...state, deletedChannelId: action.id };
    case SET_QUICK_DELETE:
      return { ...state, quickDelete: action.toggle };
    case SET_CHANNEL_SETTINGS_ID:
      return { ...state, channelSettingsId: action.channelId };
    case SET_NEW_SERVER:
      return { ...state, newServer: action.serverId };
    case SET_NEW_CHANNEL:
      return { ...state, newChannel: action.channelId };
    default:
      return state;
  }
};

const uiReducer = combineReducers({
  auth: authUiReducer,
  navbar: navbarUiReducer,
  modal: modalUiReducer,
  form: formUiReducer,
  animation: animationUiReducer,
  editDelete: editDeleteUiReducer,
});

export default uiReducer;
