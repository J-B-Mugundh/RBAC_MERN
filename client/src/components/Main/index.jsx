import styles from "./styles.module.css";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import {
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Navbar,
  NavbarBrand,
  Nav,
  Button,
} from "react-bootstrap";
import UserDetails from "./UserDetails";

const Main = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("district");
    window.location.reload();
  };

  return (
    <div className="container">
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
      <div className={styles.main_container}>
        <div>
          <h1>Welcome to PrivacyOps</h1>
          <UserDetails userId={user._id} />
        </div>
        <Card className="my-2">
          <CardImg
            alt="Card image cap"
            src="https://img.freepik.com/free-vector/data-security-technology-background-vector-blue-tone_53876-112201.jpg?size=626&ext=jpg&ga=GA1.1.553209589.1714867200&semt=ais"
            style={{
              height: 180,
            }}
            top
            width="100%"
          />
          <CardBody>
            <CardTitle tag="h5">Secure case filing</CardTitle>
            <CardText>
              Comphrensive guide to filing a case securely and privately. Within
              the bounds of the law. In just a few clicks and you are done.{" "}
              <br />
              No more hassle.
            </CardText>
            <CardText>
              <small className="text-muted">Last updated 3 mins ago</small>
            </CardText>
          </CardBody>
        </Card>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Main;
