import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./components/Main";
import Signup from "./components/Signup";
import Login from "./components/Login";
import CaseForm from "./components/CaseForm";
import CaseTable from "./components/CaseList";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const token = localStorage.getItem("token");
  let user = null;
  if (token) {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    user = JSON.parse(window.atob(base64));
  }

  return (
    <Routes>
      {user && <Route path="/" exact element={<Main user={user} />} />}
      <Route path="/signup" exact element={<Signup />} />
      <Route path="/login" exact element={<Login />} />
      <Route path="/cases" exact element={<CaseTable user={user} />} />
      <Route path="/create" element={<CaseForm user={user} />} />
      <Route path="/" element={<Navigate replace to="/login" />} />
    </Routes>
  );
}

export default App;
