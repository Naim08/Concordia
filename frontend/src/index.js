import React from "react";
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
import "./assets/fontawesome/css/all.min.css";
import "./assets/fontawesome/js/all.min.js";

const store = configureStore();

function Root() {
  return (
    <React.StrictMode>
      <ModalProvider>
        <Provider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>
      </ModalProvider>
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
  window.serversReducer = serversReducer;
}

if (
  sessionStorage.getItem("X-CSRF-Token") === null ||
  sessionStorage.getItem("currentUser") === null
) {
  store.dispatch(sessionActions.restoreSession()).then(renderApp);
} else {
  renderApp();
}
