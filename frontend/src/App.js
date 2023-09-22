import { useSelector, useDispatch } from "react-redux";
import "./app.css";

import SignUpForm from "./components/signup";
import LoginForm from "./components/login";
import { Routes, Route } from "react-router-dom";
import Splash from "./components/splash";
import AuthRoute from "./components/auth/authRoute";
import ProtectedRoute from "./components/auth/protectedRoute";
import HomePage from "./components/home";

import ServerSideBar from "./components/server/serverSideBar";
import NotFound from "./components/404/notFound";
import ServerPage from "./components/server";

function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<Splash />} />

        <Route path="/" element={<AuthRoute />}>
          <Route path="signup" element={<SignUpForm />} />
          <Route path="login" element={<LoginForm />} />
        </Route>

        <Route path="/home" element={<ProtectedRoute />}>
          <Route
            index
            element={
              <>
                {" "}
                <ServerSideBar />
                <ServerPage />
              </>
            }
          />
        </Route>

        <Route path="/server/:serverId" element={<ProtectedRoute />}>
          <Route
            index
            element={
              <>
                {" "}
                <ServerSideBar />
                <ServerPage />
              </>
            }
          />

          <Route
            path=":channelId"
            element={
              <>
                {" "}
                <ServerSideBar />
                <ServerPage />
              </>
            }
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
