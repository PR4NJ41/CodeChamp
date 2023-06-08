import React, { useEffect, useState, useContext } from "react";

const contestApi = "https://codeforces.com/api/contest.list";
const questionApi = "https://codeforces.com/api/problemset.problems";
const submissionApi =
	"https://codeforces.com/api/user.status?handle=unseenSpirit";

const AppContext = React.createContext(0);
const AppProvider = ({ children }) => {
	const [contests, setContests] = useState([]);
	const [questions, setQuestions] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [qLoading, setQLoading] = useState(true);

	const [submissions, setSubmissions] = useState([]);
	const [acceptedProblems, setAcceptedProblems] = useState([]);

	const getContests = async (url) => {
		try {
			const res = await fetch(url);
			const data = await res.json();
			const p = data.result;
			console.log(p);
			setContests(p);
			setIsLoading(false);
		} catch (error) {
			console.log(error);
		}
	};
	const getQuestions = async (url) => {
		try {
			const response = await fetch(url);
			const data = await response.json();
			setQuestions(data.result.problems);
			setQLoading(false);
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
			console.error(console.log(error));
		}
	};

	useEffect(() => {
		getContests(contestApi);
		getQuestions(questionApi);
		fetchSubmissions(submissionApi);
	}, []);

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
			value={{ isLoading, contests, questions, acceptedProblems }}
		>
			{children}
		</AppContext.Provider>
	);
};

const useGlobalContext = () => {
	return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalContext };
