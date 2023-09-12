import React from "react";
import "./index.css";
import App from "./App";
import configureStore from "./store";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import * as sessionActions from "./store/session";
import csrfFetch from "./store/csrf";

const store = configureStore();

function Root() {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  );
}
function renderApp() {
  createRoot(document.getElementById("root")).render(<Root />);
}

if (process.env.NODE_ENV !== "production") {
  window.store = store;
  window.csrfFetch = csrfFetch;
  window.sessionActions = sessionActions;
}

if (
  sessionStorage.getItem("X-CSRF-Token") === null ||
  sessionStorage.getItem("currentUserId") === null
) {
  store.dispatch(sessionActions.restoreSession()).then(renderApp);
} else {
  renderApp();
}
