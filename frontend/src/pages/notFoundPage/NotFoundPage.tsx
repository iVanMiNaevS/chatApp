import React from "react";
import styles from "./pageNotFound.module.scss";
import {Link} from "react-router-dom";
const NotFoundPage = () => {
	return (
		<div className={styles.main}>
			<div className={styles.block}>
				<h2>404</h2>
				<p>Page not found</p>
				<Link to={"/"}>BACK</Link>
			</div>
		</div>
	);
};

export default NotFoundPage;
