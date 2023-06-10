import React, { useState } from "react";
import "./homepage.css";
import Profile from "../Profile/profile";

const HomePage = () => {
	const [errorMessage, setErrorMessage] = useState(false);
	return (
		<div>
			{"user" in localStorage ? (
				<Profile />
			) : (
				<div className="home">
					<input placeholder="Enter ID" id="userNameInput"></input>
					<input placeholder="Enter Password" id="pass"></input>
					{errorMessage && (
						<div className="loginError">
							Enter Valid Codeforces id
						</div>
					)}
					<button
						onClick={() => {
							if (
								document.getElementById("pass").value == "12344"
							) {
								if (
									document.getElementById("userNameInput")
										.value
								) {
									localStorage.setItem(
										"user",
										document.getElementById("userNameInput")
											.value
									);
									window.location.reload();
								} else {
									setErrorMessage(true);
								}
							}
						}}
					>
						Enter
					</button>
				</div>
			)}
		</div>
	);
};

export default HomePage;
