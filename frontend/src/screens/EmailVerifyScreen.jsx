import { useEffect, useState,Fragment } from "react";
import { useParams, Link } from "react-router-dom";
// import success from "../Images/success.avif";

import axios from "axios";
// import success from "../../images/success.png";
import  "../CSS/email-verify.css";
import { CheckCircleIcon } from "@chakra-ui/icons";
// import { Fragment } from "react/cjs/react.production.min";

const EmailVerifyScreen = () => {
	const [validUrl, setValidUrl] = useState(false);
	const param = useParams();

	useEffect(() => {
		const verifyEmailUrl = async () => {
			try {
				console.log(param);
				const url = `http://localhost:4000/auth/users/${param.username}/verifyemail`;
				const { data } = await axios.post(url,{token:param.token});
				console.log(data);
				setValidUrl(true);
			} catch (error) {
				console.log(error);
				setValidUrl(false);
			}
		};
		verifyEmailUrl();
	}, [param]);

	return (
		<Fragment>
			{validUrl ? (
				<div className={"container"}>
					<CheckCircleIcon />
					{/* <img src={success} alt="success_img" className={"success_img"} /> */}
					<h1>Email verified successfully</h1>
					<Link to="/users/login">
						<button className={"green_btn"}>Login</button>
					</Link>
				</div>
			) : (
				<h1>404 Not Found</h1>
			)}
		</Fragment>
	);
};

export default EmailVerifyScreen;