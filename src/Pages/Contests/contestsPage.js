import React, { useState } from "react";
import { useEffect } from "react";
import "../Profile/homepage.css";
import "../Profile/contestPage.css";
import Navbar from "../../Components/Navbar/navbar";
import { useGlobalContext } from "../../Components/Context/context";

const ContestsPage = () => {
	// let API = "https://codeforces.com/api/problemset.problems";
	const { contests } = useGlobalContext();
	// let API2 = "https://codeforces.com/api/contest.list";
	const [posts, setPosts] = useState([]);

	// const fetchApiData = () => {
	// 	fetch(API2)
	// 		.then((response) => response.json())
	// 		.then((data) => setPosts(data.result));
	// };

	const [currentpage, setCurrentpage] = useState(1);
	const recordPerPage = 50;
	const lastIndex = recordPerPage * currentpage;
	const firstIndex = lastIndex - recordPerPage;

	const records = contests.slice(3, 60);
	const nPages = Math.ceil(contests.length / recordPerPage);
	const numbers = [...Array(nPages + 1).keys()].slice(1);

	// useEffect(() => {
	// 	fetchApiData();
	// }, []);

	return (
		<div className="main">
			<Navbar />

			<div className="contestSort">
				<button className="chip">Div 1</button>
				<div className="chip">Div 2</div>
				<div className="chip">Div 3</div>
				<div className="chip">Div 4</div>
				<div className="chip">Edu Rounds</div>
			</div>
			<div className="grid">
				{records.map((post, index) => (
					<>
						{post.phase === "FINISHED" && (
							<a
								href={`https://codeforces.com/contest/${post.id}`}
							>
								<div className="card" key={index}>
									<h4>
										<tr className="tableRow">
											<td
												className="t2"
												style={{ textAlign: "left" }}
											>
												{post.name}
											</td>
										</tr>
									</h4>
								</div>
							</a>
						)}
					</>
				))}
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

export default ContestsPage;
