import styles from "./styles.module.css";
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


  return (
    <div className="container">
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
