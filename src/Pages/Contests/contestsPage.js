import React, { useState } from "react";
import { useEffect } from "react";
import "../Profile/homepage.css";
import "../Profile/contestPage.css";
import Navbar from "../../Components/Navbar/navbar";
import { useGlobalContext } from "../../Components/Context/context";

const ContestsPage = () => {
	// let API = "https://codeforces.com/api/problemset.problems";
	const { contests, filterContest, setFilterContest, questions, acceptedQuestions, setContests, onLoading, setOnLoading } = useGlobalContext();
	// let API2 = "https://codeforces.com/api/contest.list";
	// const [posts, setPosts] = useState([]);

	// const fetchApiData = () => {
	// 	fetch(API2)
	// 		.then((response) => response.json())
	// 		.then((data) => setPosts(data.result));
	// };
	const contestApi = "https://codeforces.com/api/contest.list";

	const [currentpage, setCurrentpage] = useState(1);
	const recordPerPage = 50;
	const lastIndex = recordPerPage * currentpage;
	const firstIndex = lastIndex - recordPerPage;

	const records = filterContest.slice(firstIndex, lastIndex);
	const nPages = Math.ceil(filterContest.length / recordPerPage);

	// useEffect(() => {
	// 	fetchApiData();
	// }, []);

	const getContests = async (url) => {
		try {
			const res = await fetch(url);
			const data = await res.json();
			setContests(data.result);
			setFilterContest(data.result);
			localStorage.setItem("contest", true);
		} catch (error) {
			console.log(error);
		}
	};

	const sortContest = (e) => {
		const temp = contests.filter((q) => q.name.toLowerCase().includes(e));
		setFilterContest(temp);
	};
	useEffect(() => {
		if (!(localStorage.getItem("contest") == "false")) {
			setOnLoading(true);

			getContests(contestApi).then(() => {
				setOnLoading(false);
			});
		}
	}, []);

	return (
		<div className="main">
			{onLoading && <div className="loader" />}
			<Navbar />

			<div className="contestSort">
				<div className="chip" onClick={() => sortContest("")}>
					All
				</div>
				<div className="chip" onClick={() => sortContest("(div. 1)")}>
					Div 1
				</div>
				<div className="chip" onClick={() => sortContest("(div. 2)")}>
					Div 2
				</div>
				<div className="chip" onClick={() => sortContest("(div. 3)")}>
					Div 3
				</div>
				<div className="chip" onClick={() => sortContest("(div. 4)")}>
					Div 4
				</div>
				<div className="chip" onClick={() => sortContest("educational")}>
					Edu Rounds
				</div>
				<div className="chip" onClick={() => sortContest("(div. 1 +")}>
					Other
				</div>
			</div>
			<div className="grid">
				<table>
					<th className="tableRow">
						<td
							className="t1"
							style={{
								color: "#c9d9ff",
								fontSize: "24px",
								fontWeight: "bolder",
							}}
						>
							Contests
						</td>
					</th>
					{records.map((post, index) => {
						if (post.phase == "FINISHED") {
							return (
								<tr className="tableRow">
									<td className="t2" style={{ textAlign: "center" }}>
										<a style={{ color: "#c9d9ff" }} href={`https://codeforces.com/contest/${post.id}`}>
											{post.name}
										</a>
									</td>
									<td className="t2" style={{ textAlign: "center" }}>
										<a style={{ color: "#c9d9ff" }}></a>
									</td>
								</tr>
							);
						}
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

export default ContestsPage;
