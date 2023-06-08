import React, { useState } from "react";
import { useEffect } from "react";
import "../Profile/homepage.css";
import Navbar from "../../Components/Navbar/navbar";
import { useGlobalContext } from "../../Components/Context/context";
import "./questionsPage.css";

const QuestionsPage = () => {
	let API = "https://codeforces.com/api/problemset.problems";
	const [posts, setPosts] = useState([]);
	const { questions, acceptedProblems } = useGlobalContext();

	// const fetchApiData = () => {
	// 	fetch(API)
	// 		.then((response) => response.json())
	// 		.then((data) => setPosts(data.result.problems));
	// };

	const [currentpage, setCurrentpage] = useState(1);
	const recordPerPage = 50;
	const lastIndex = recordPerPage * currentpage;
	const firstIndex = lastIndex - recordPerPage;

	const records = questions.slice(firstIndex, lastIndex);
	const nPages = Math.ceil(questions.length / recordPerPage);
	const numbers = [...Array(nPages + 1).keys()].slice(1);

	// useEffect(() => {
	// 	fetchApiData();
	// }, []);

	return (
		<div className="main">
			<Navbar />

			<input className="searchbox" placeholder="Search Question"></input>
			<div className="grid">
				<div className="cardHead">
					<h4>
						<tr className="tableRow">
							<td
								className="t1"
								style={{
									color: "white",
									fontSize: "24px",
									fontWeight: "bolder",
								}}
							>
								Contest Id
							</td>
							<td
								className="t2"
								style={{
									color: "white",
									fontSize: "24px",
									fontWeight: "bolder",
								}}
							>
								Problem
							</td>
							<td
								className="t3"
								style={{
									color: "white",
									fontSize: "24px",
									fontWeight: "bolder",
								}}
							>
								Rating
							</td>
							<td
								className="t4"
								style={{
									color: "white",
									fontSize: "24px",
									fontWeight: "bolder",
								}}
							>
								Solved
							</td>
						</tr>
					</h4>
				</div>
				{records.map((post, index) => {
					const isAccepted = acceptedProblems.some(
						(accepted) =>
							accepted.contestId === post.contestId &&
							accepted.index === post.index
					);
					return (
						<>
							{post.rating && (
								<a
									href={`https://codeforces.com/problemset/problem/${post.contestId}/${post.index}`}
								>
									<div className="card" key={index}>
										<h4>
											<tr className="tableRow">
												<td className="t1">
													{post.contestId}
													{post.index}
												</td>
												<td className="t2">
													{post.name}
												</td>
												<td className="t3">
													{post.rating}
												</td>
												<td className="t4">
													<div
														className={
															isAccepted
																? "greenCircle"
																: ""
														}
													></div>
												</td>
											</tr>
										</h4>
									</div>
								</a>
							)}
						</>
					);
				})}
			</div>
			<div className="navigation">
				<tr className="navBox">
					<a className="navBtn" href="#" onClick={firstPage}>
						{"<<"}
					</a>
					<a href="#" className="navBtn" onClick={prevPage}>
						{"<"}
					</a>
					<td className="navPgNo">{`${currentpage} of ${nPages}`}</td>
					<a href="#" className="navBtn" onClick={nextPage}>
						{">"}
					</a>
					<a href="#" onClick={lastPage} className="navBtn">
						{">>"}
					</a>
				</tr>
			</div>
		</div>
	);

	function nextPage() {
		if (currentpage !== nPages) {
			setCurrentpage(currentpage + 1);
		}
	}
	function prevPage() {
		if (currentpage !== 1) {
			setCurrentpage(currentpage - 1);
		}
	}
	function firstPage() {
		setCurrentpage(1);
	}
	function lastPage() {
		setCurrentpage(nPages);
	}
};

export default QuestionsPage;
