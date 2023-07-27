import { useEffect, useState, Fragment } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
// import success from "../Images/success.avif";

import axios from "axios";
// import success from "../../images/success.png";
import "../CSS/email-verify.css";
import { CheckCircleIcon } from "@chakra-ui/icons";
import RedirectTO404 from "../components/RedirectTO404";
import { Heading } from "@chakra-ui/react";
// import { Fragment } from "react/cjs/react.production.min";

const EmailVerifyScreen = ({ showLogo, setShowlogo }) => {
	const [validUrl, setValidUrl] = useState(true);
	const param = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		setShowlogo(true);
		const verifyEmailUrl = async () => {
			try {
				setValidUrl(true);
				console.log(param);
				const url = `http://localhost:4000/users/${param.username}/verifyemail`;
				const { data } = await axios.post(url, { token: param.token });
				console.log(data);
			} catch (error) {
				console.log("error  " + error);
				setValidUrl(false);
			}
		};
		verifyEmailUrl();
	}, []);

	return (
		<Fragment>
			{validUrl ? (
				<div className={"container"}>
					<CheckCircleIcon boxSize={10} color={"green"} />
					{/* <img src={success} alt="success_img" className={"success_img"} /> */}
					<Heading my={"20px"}>Email verified successfully</Heading>
					<Link to="/users/login">
						<button className={"green_btn"}>Login</button>
					</Link>
				</div>
			) :
				<RedirectTO404 />
			}
		</Fragment>
	);
};

export default EmailVerifyScreen;