import { useSelector, useDispatch } from "react-redux";
import "./app.css";

import SignUpForm from "./components/signup";
import LoginForm from "./components/login";
import { Routes, Route } from "react-router-dom";
import Splash from "./components/splash";
import AuthRoute from "./components/auth/authRoute";
import ProtectedRoute from "./components/auth/protectedRoute";
import HomePage from "./components/home";
import ServerIndex from "./components/server";
import ServerSideBar from "./components/server/serverSideBar";
import NotFound from "./components/404/notFound";

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
          <Route index element={<HomePage />} />
        </Route>

        <Route path="/servers" element={<ProtectedRoute />}>
          <Route index element={<ServerSideBar />} />
          <Route path=":serverId" element={<ServerSideBar />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
