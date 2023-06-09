import React, { useState, useEffect } from "react";
import Navbar from "../../Components/Navbar/navbar";
import "./profile.css";
import { useGlobalContext } from "../../Components/Context/context";

const Profile = () => {
	const { userName, setUserName, acceptedProblems, profile } =
		useGlobalContext();

	return (
		<div className="main">
			<Navbar />
			<div className="profile">
				<input
					placeholder={acceptedProblems.length}
					id="userNameInput"
				></input>
				<button
					onClick={() => {
						localStorage.setItem(
							"user",
							document.getElementById("userNameInput").value
						);
						setUserName(
							document.getElementById("userNameInput").value
						);
						window.location.reload();
					}}
				>
					Save
				</button>
				<div className="userData">
					<div className="left">
						<img src={profile.titlePhoto} className="userImg"></img>
					</div>
					<div className="right">
						<table>
							<tr>
								<td>Name</td>
								<td>
									{profile.firstName} {profile.lastName}
								</td>
							</tr>

							<tr>
								<td>Country</td>
								<td>{profile.country}</td>
							</tr>
							<tr>
								<td>Rating</td>
								<td>{profile.rating}</td>
							</tr>
							<tr>
								<td>Handle</td>
								<td>{profile.handle}</td>
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
			</div>
		</div>
	);
};

export default Profile;
