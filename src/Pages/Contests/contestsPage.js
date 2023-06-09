import React, { useState } from "react";
import { useEffect } from "react";
import "../Profile/homepage.css";
import "../Profile/contestPage.css";
import Navbar from "../../Components/Navbar/navbar";
import { useGlobalContext } from "../../Components/Context/context";

const ContestsPage = () => {
	// let API = "https://codeforces.com/api/problemset.problems";
	const { contests, filterContest, setFilterContest } = useGlobalContext();
	// let API2 = "https://codeforces.com/api/contest.list";
	// const [posts, setPosts] = useState([]);

	// const fetchApiData = () => {
	// 	fetch(API2)
	// 		.then((response) => response.json())
	// 		.then((data) => setPosts(data.result));
	// };

	const [currentpage, setCurrentpage] = useState(1);
	const recordPerPage = 50;
	const lastIndex = recordPerPage * currentpage;
	const firstIndex = lastIndex - recordPerPage;

	const records = filterContest.slice(firstIndex, lastIndex);
	const nPages = Math.ceil(filterContest.length / recordPerPage);

	// useEffect(() => {
	// 	fetchApiData();
	// }, []);

	const sortContest = (e) => {
		const temp = contests.filter((q) => q.name.toLowerCase().includes(e));
		setFilterContest(temp);
	};

	return (
		<div className="main">
			<Navbar />

			<div className="contestSort">
				<div className="chip" onClick={() => sortContest("")}>All</div>
				<div className="chip" onClick={() => sortContest("(div. 1)")}>Div 1</div>
				<div className="chip" onClick={() => sortContest("(div. 2)")}>Div 2</div>
				<div className="chip" onClick={() => sortContest("(div. 3)")}>Div 3</div>
				<div className="chip" onClick={() => sortContest("(div. 4)")}>Div 4</div>
				<div className="chip" onClick={() => sortContest("educational")}>Edu Rounds</div>
				<div className="chip" onClick={() => sortContest("(div. 1 +")}>Other</div>
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
