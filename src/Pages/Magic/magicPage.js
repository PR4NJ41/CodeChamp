import React, { useEffect, useState } from "react";
import "../Profile/homepage.css";
import "../Profile/contestPage.css";
import Navbar from "../../Components/Navbar/navbar";
import { useGlobalContext } from "../../Components/Context/context";

const finalRating = {
	r1: 800,
	r2: 900,
	r3: 1000,
};

function getRated(rating) {
	if (rating <= 1000) {
		return finalRating;
	} else {
		return { r1: rating < 3300 ? rating : 3300, r2: rating + 100 < 3400 ? rating + 100 : 3400, r3: rating + 200 < 3500 ? rating + 200 : 3500 };
	}
}

const MagicPage = () => {
	const { questions, acceptedProblems, i, setI, userName, profile } = useGlobalContext();
	const [magicItems, setMagicItems] = useState([]);
	const todayDate = new Date();
	const rating = Math.trunc(profile.rating / 100) * 100;
	console.log(rating, "sjdhkvb");
	const date = todayDate.getFullYear() + "/" + todayDate.getMonth() + "/" + todayDate.getDay();

	let final = [];

	//
	console.log("i:", i, "questions.length", questions.length);
	function isObjectPresent(obj, array) {
		return array.some((item) => item.contestId === obj.contestId && item.index === obj.index);
	}

	const doMagic = () => {
		console.log("doi:", i, "doquestions.length", questions.length);
		const a1 = questions.filter((q) => q.rating == getRated(rating).r1);
		for (let l = 0; l < a1.length; l++) {
			if (!isObjectPresent(a1[l], acceptedProblems)) {
				final.push(a1[l]);
			}
			if (final.length > 2) {
				break;
			}
		}

		const a2 = questions.filter((q) => q.rating == getRated(rating).r2);
		for (let l = 0; l < a2.length; l++) {
			if (!isObjectPresent(a2[l], acceptedProblems)) {
				final.push(a2[l]);
			}
			if (final.length > 4) {
				break;
			}
		}
		const a3 = questions.filter((q) => q.rating == getRated(rating).r3);
		for (let l = 0; l < a3.length; l++) {
			if (!isObjectPresent(a3[l], acceptedProblems)) {
				final.push(a3[l]);
			}
			if (final.length > 6) {
				break;
			}
		}
		if (i == 1) {
			if (!"MagicDate" in localStorage || date !== localStorage.getItem("MagicDate") || !"magicUser" in localStorage || userName !== localStorage.getItem("magicUser")) {
				localStorage.setItem("magicUser", userName);
				// alert("Questions updated", userName);
				console.log(userName, "Chhh");
				localStorage.setItem("fine", JSON.stringify(final));
				localStorage.setItem("MagicDate", date);
			}
		}
	};

	useEffect(() => {
		if (i < 2) {
			doMagic();
			console.log("use", i);
			setI(i + 1);
		}
		setMagicItems(JSON.parse(localStorage.getItem("fine")));
	}, [i]);
	return (
		<div className="main">
			<Navbar />
			<div>
				{"MagicDate" in localStorage && (
					<div className="grid">
						{magicItems.map((pos) => {
							const isAccepted = acceptedProblems.some((accepted) => accepted.contestId === pos.contestId && accepted.index === pos.index);
							return (
								<a href={`https://codeforces.com/problemset/problem/${pos.contestId}/${pos.index}`}>
									<div className="card">
										<h4>
											<tr className="tableRow">
												<td className="t1">
													{pos.contestId}
													{pos.index}
												</td>
												<td className="t2">{pos.name}</td>
												<td className="t3">{pos.rating}</td>
												<td className="t4">{isAccepted ? <div className="accepted">Accepted</div> : ""}</td>
											</tr>
										</h4>
									</div>
								</a>
							);
						})}
					</div>
				)}
			</div>
		</div>
	);
};

export default MagicPage;
