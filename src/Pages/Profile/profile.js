import React, { useState, useEffect } from "react";
import Navbar from "../../Components/Navbar/navbar";
import "./profile.css";
import { useGlobalContext } from "../../Components/Context/context";
// import RatedProblemFetcher from "../../Components/ratedProblemFetcher";

const Profile = () => {
	// var { userName, setUserName, acceptedProblems, profile, onLoading, setOnLoading } = useGlobalContext();
	var { setUserName, profile, onLoading, setOnLoading, questions, acceptedProblems, i, setI, userName } = useGlobalContext();

	// window.addEventListener("load", () => {
	// 		const loader = document.querySelector(".loader");
	// 		loader.classList.add("loader-hidden");

	// 	loader.addEventListener("transitioned", () => {
	// 		document.body.removechild("loader");
	// 	});
	// });

	useEffect(() => {
		// RatedProblemFetcher("Pranjal", setUserName, profile, onLoading, setOnLoading, questions, acceptedProblems, i, setI, userName);
		setUserName(localStorage.getItem("user"));
	}, []);

	return (
		<div className="main">
			{onLoading && <div className="loader" />}
			<Navbar />
			<div className="profile">
				<div className="userData">
					<div className="left">
						<img src={profile.titlePhoto} className="userImg"></img>
					</div>
					<div className="right">
						<table>
							{profile.firstName && (
								<tr>
									<td>Name</td>
									<td>
										{profile.firstName} {profile.lastName}
									</td>
								</tr>
							)}

							{profile.country && (
								<tr>
									<td>Country</td>
									<td>{profile.country}</td>
								</tr>
							)}

							<tr>
								<td>Rating</td>
								<td>{profile.rating}</td>
							</tr>
							<tr>
								<td>Handle</td>
								<td>@{profile.handle}</td>
							</tr>
							<tr>
								<td>Rank</td>
								<td>{profile.rank}</td>
							</tr>
							<tr>
								<td>Maximum Rating</td>
								<td>{profile.maxRating}</td>
							</tr>
							<tr>
								<td>Maximum Rank</td>
								<td>{profile.maxRank}</td>
							</tr>
						</table>
					</div>
				</div>
				<button
					onClick={() => {
						localStorage.clear();
						window.location.reload();
					}}
				>
					Log Out
				</button>
			</div>
		</div>
	);
};

export default Profile;
