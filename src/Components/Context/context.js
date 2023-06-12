import React, { useEffect, useState, useContext } from "react";

const contestApi = "https://codeforces.com/api/contest.list";
const questionApi = "https://codeforces.com/api/problemset.problems";

const AppContext = React.createContext(0);
const AppProvider = ({ children }) => {
	const [contests, setContests] = useState([]);
	const [questions, setQuestions] = useState([]);
	const [submissions, setSubmissions] = useState([]);
	const [acceptedProblems, setAcceptedProblems] = useState([]);
	const [userName, setUserName] = useState("");
	const [newQuestions, setNewQuestions] = useState(questions);
	const [profile, setProfile] = useState([]);
	const [filterContest, setFilterContest] = useState(contests);

	const getContests = async (url) => {
		try {
			const res = await fetch(url);
			const data = await res.json();
			setContests(data.result);
			setFilterContest(data.result);
		} catch (error) {
			console.log(error);
		}
	};
	let fQ = [];
	const [i, setI] = useState(0);

	const getQuestions = async (url) => {
		try {
			const response = await fetch(url);
			const data = await response.json();
			// data.result.problems.map((q) => {
			// 	{
			// 		q.rating && fQ.push(q);
			// 	}
			// });
			fQ = data.result.problems.filter((q) => q.rating > 0);

			setQuestions(fQ);

			// k = data.result.problems.filter((f) => f.rating != null);
			setNewQuestions(fQ);
		} catch (error) {
			console.log(error);
		}
	};

	const fetchSubmissions = async (url) => {
		try {
			const response = await fetch(url);
			const data = await response.json();
			setSubmissions(data.result);
		} catch (error) {
			console.log(error);
		}
	};
	const fetchProfile = async (name) => {
		try {
			const response = await fetch(`https://codeforces.com/api/user.info?handles=${name}`);
			const data = await response.json();
			setProfile(data.result[0]);
			console.log(data.result[0]);
		} catch (error) {
			console.log(error);
		}
	};

	async function main() {
		const m = localStorage.getItem("user");
		const apis = [fetch(contestApi), fetch(questionApi), fetch(`https://codeforces.com/api/user.info?handles=${m}`)];

		try {
			// const res = await Promise.allSettled(apis);\
			// const data = await Promise.all(
			// 	res.map((item) => {
			// 		return item.json();
			// 	})
			// );
			// console.log("mera data", data);
		} catch (e) {
			console.log("errrorryttr");
		}
	}

	useEffect(() => {
		const m = localStorage.getItem("user");
		console.log(localStorage.getItem("user"), "name");
		fetchProfile(m);
		console.log(profile);
		setUserName(localStorage.getItem("user"));
		getContests(contestApi);
		getQuestions(questionApi);
		// main();

		// const timer = setTimeout(() => {}, 4000);

		// return () => clearTimeout(timer);
	}, []);

	useEffect(() => {
		if (localStorage.getItem("user")) {
			fetchSubmissions(`https://codeforces.com/api/user.status?handle=${localStorage.getItem("user")}`);
		}
	}, [userName]);

	useEffect(() => {
		const acceptedProblems = submissions
			.filter((submission) => submission.verdict === "OK")
			.map((submission) => ({
				contestId: submission.problem.contestId,
				index: submission.problem.index,
			}));

		setAcceptedProblems(acceptedProblems);
	}, [submissions]);

	return (
		<AppContext.Provider
			value={{
				contests,
				questions,
				userName,
				submissions,
				acceptedProblems,
				setUserName,
				setSubmissions,
				setAcceptedProblems,
				newQuestions,
				setNewQuestions,
				i,
				setI,
				profile,
				filterContest,
				setFilterContest,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

const useGlobalContext = () => {
	return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalContext };
