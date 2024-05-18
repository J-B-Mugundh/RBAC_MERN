import { Route, Routes, Navigate } from "react-router-dom";

import { useState } from "react";
import Main from "./components/Main";
import Signup from "./components/Signup";
import Login from "./components/Login";
import CaseForm from "./components/CaseForm";
import CaseTable from "./components/CaseList";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

import { Navbar, NavbarBrand, Nav, Button } from "react-bootstrap";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("district");
    window.location.reload();
  };
  const token = localStorage.getItem("token");
  let user = null;
  if (token) {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    user = JSON.parse(window.atob(base64));
  }

  return (
    <>
      <Navbar className="my-2" color="dark" dark>
        <NavbarBrand href="/">
          <img
            alt="logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Seal_of_Karnataka.svg/1200px-Seal_of_Karnataka.svg.png"
            style={{
              height: 40,
              width: 40,
            }}
          />
          PrivacyOps
        </NavbarBrand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/create">New Case</Nav.Link>
            <Nav.Link href="/cases">Case Records</Nav.Link>
            <Button onClick={handleLogout}>Logout</Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Routes>
        {user && <Route path="/" exact element={<Main user={user} />} />}
        <Route path="/signup" exact element={<Signup />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/cases" exact element={<CaseTable user={user} />} />
        <Route path="/create" element={<CaseForm user={user} />} />
        <Route path="/" element={<Navigate replace to="/login" />} />
      </Routes>
    </>
  );
}

export default App;
