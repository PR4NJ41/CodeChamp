import React, { useState } from "react";
import { useEffect } from "react";
import "../Profile/homepage.css";
import Navbar from "../../Components/Navbar/navbar";
import { useGlobalContext } from "../../Components/Context/context";
import "./questionsPage.css";

const QuestionsPage = () => {
	const { questions, acceptedProblems, newQuestions, setNewQuestions } = useGlobalContext();

	const [currentpage, setCurrentpage, k] = useState(1);
	const recordPerPage = 50;
	const lastIndex = recordPerPage * currentpage;
	const firstIndex = lastIndex - recordPerPage;

	const records = newQuestions.slice(firstIndex, lastIndex);
	const nPages = Math.ceil(newQuestions.length / recordPerPage);

	const search = (event) => {
		const p = questions.filter((e) => e.name.toLowerCase().includes(event.target.value.toLowerCase()) || (e.rating.toString().includes(event.target.value.toString()) && e.rating.toString().length == event.target.value.toString().length));
		setNewQuestions(p);
	};

	return (
		<div className="main">
			<Navbar />
			<div className="searchBox">
				<input className="newSearch" placeholder="Search Question" id="questionSearch" onChange={search}></input>
				<div className="search">
					<img src="search.svg"></img>
				</div>
			</div>

			<div className="grid">
				<table>
					<th className="tableRow">
						<td
							className="t1"
							style={{
								color: "#b2bde5",
								fontSize: "24px",
								fontWeight: "bolder",
							}}
						>
							Contest
						</td>
						<td
							className="t2"
							style={{
								color: "#b2bde5",
								fontSize: "24px",
								fontWeight: "bolder",
							}}
						>
							Problem
						</td>
						<td
							className="t3"
							style={{
								color: "#b2bde5",
								fontSize: "24px",
								fontWeight: "bolder",
							}}
						>
							Rating
						</td>
						<td
							className="t3"
							style={{
								color: "#b2bde5",
								fontSize: "24px",
								fontWeight: "bolder",
							}}
						>
							Save
						</td>
						<td
							className="t4"
							style={{
								color: "#b2bde5",
								fontSize: "24px",
								fontWeight: "bolder",
							}}
						>
							Solved ({acceptedProblems.length})
						</td>
					</th>

					{records.map((post, index) => {
						const isAccepted = acceptedProblems.some((accepted) => accepted.contestId === post.contestId && accepted.index === post.index);
						return (
							<tr className="tableRow">
								<td className="t1">
									<a style={{ color: "tomato" }} href={`https://codeforces.com/problemset/problem/${post.contestId}/${post.index}`}>
										{post.contestId}
										{post.index}
									</a>
								</td>
								<td className="t2">
									<a style={{ color: "#c9d9ff" }} href={`https://codeforces.com/problemset/problem/${post.contestId}/${post.index}`}>
										{post.name}
									</a>
								</td>
								<td className="t3">{post.rating}</td>
								<td className="t3">
									<img src="/boo.svg"></img>
								</td>
								<td className="t4">
									<input
										type="checkbox"
										name="subscribe"
										value="newsletter"
										defaultChecked={isAccepted}
										onChange={() => {
											console.log("ook");
										}}
									></input>
								</td>
								<td className="t4">{isAccepted ? <div className="accepted">Accepted</div> : ""}</td>
							</tr>
						);
					})}
				</table>
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
