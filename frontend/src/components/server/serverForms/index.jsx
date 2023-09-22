import "./serverForm.css";
import { useSelector } from "react-redux";
import { getServerFormType } from "../../../store/ui";
import CreateServerForm from "./createServer";
import JoinServerForm from "./joinServer";
import StartServerForm from "./startServer";

const ServerForms = () => {
  const formType = useSelector(getServerFormType);

  if (formType === "create") return <CreateServerForm />;
  else if (formType === "join") return <JoinServerForm />;
  else return <StartServerForm />;
};

export default ServerForms;
