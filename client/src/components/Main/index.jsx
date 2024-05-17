import styles from "./styles.module.css";
import CaseForm from "../CaseForm";

const Main = ({ user }) => {
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

	return (
		<div className={styles.main_container}>
			<nav className={styles.navbar}>
				<h1>Criminal Case Filing System</h1>
				<button className={styles.white_btn} onClick={handleLogout}>
					Logout
				</button>
			</nav>
			{user.role === 0 || user.role === 1 ? (
				<CaseForm user={user} />
			) : (
				<h2>Welcome to Privacy Ops - Learn about Privacy principles and ethics here!</h2>
			)}
		</div>
	);
};

export default Main;
