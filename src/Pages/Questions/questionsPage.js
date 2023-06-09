import React, { useState } from "react";
import { useEffect } from "react";
import "../Profile/homepage.css";
import Navbar from "../../Components/Navbar/navbar";
import { useGlobalContext } from "../../Components/Context/context";
import "./questionsPage.css";

const QuestionsPage = () => {
	const { questions, acceptedProblems, newQuestions, setNewQuestions } =
		useGlobalContext();

	const [currentpage, setCurrentpage, k] = useState(1);
	const recordPerPage = 50;
	const lastIndex = recordPerPage * currentpage;
	const firstIndex = lastIndex - recordPerPage;

	const records = newQuestions.slice(firstIndex, lastIndex);
	const nPages = Math.ceil(newQuestions.length / recordPerPage);

	const search = (event) => {
		const p = questions.filter(
			(e) =>
				e.name
					.toLowerCase()
					.includes(event.target.value.toLowerCase()) ||
				(e.rating.toString().includes(event.target.value.toString()) &&
					e.rating.toString().length ==
						event.target.value.toString().length)
		);
		setNewQuestions(p);
	};

	return (
		<div className="main">
			<Navbar />

			<input
				className="searchbox"
				placeholder="Search Question"
				id="questionSearch"
				onChange={search}
			></input>
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
								Solved ({acceptedProblems.length})
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
						<div>
							{true && (
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
													{isAccepted ? (
														<div className="accepted">
															Accepted
														</div>
													) : (
														""
													)}
												</td>
											</tr>
										</h4>
									</div>
								</a>
							)}
						</div>
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
