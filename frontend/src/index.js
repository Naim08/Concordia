import React, { StrictMode } from "react";
import "./index.css";
import App from "./App";
import configureStore from "./store";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import * as sessionActions from "./store/session";
import csrfFetch from "./store/csrf";
import * as serversReducer from "./store/server";
import { ModalProvider } from "./components/modal/modal";
import * as conversationReducer from "./store/conversation";

const store = configureStore();

function Root() {
  return (
    <StrictMode>
      <ModalProvider>
        <Provider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>
      </ModalProvider>
    </StrictMode>
  );
}
function renderApp() {
  createRoot(document.getElementById("root")).render(<Root />);
}

if (process.env.NODE_ENV !== "production") {
  window.store = store;
  window.csrfFetch = csrfFetch;
  window.sessionActions = sessionActions;
  window.serversReducer = serversReducer;
  window.conversationReducer = conversationReducer;
}

if (
  sessionStorage.getItem("X-CSRF-Token") === null ||
  sessionStorage.getItem("currentUser") === null
) {
  store.dispatch(sessionActions.restoreSession()).then(renderApp);
} else {
  renderApp();
}
