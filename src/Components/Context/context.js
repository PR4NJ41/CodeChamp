import React, { useEffect, useState, useContext } from "react";

const contestApi = "https://codeforces.com/api/contest.list";
const questionApi = "https://codeforces.com/api/problemset.problems";

const AppContext = React.createContext(0);
const AppProvider = ({ children }) => {
	const [contests, setContests] = useState([]);
	const [questions, setQuestions] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [qLoading, setQLoading] = useState(true);

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
			const res = await fetch(url);
			const data = await res.json();
			setQuestions(data.result.problems);
			setQLoading(false);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getContests(contestApi);
		getQuestions(questionApi);
	}, []);
	return (
		<AppContext.Provider value={{ isLoading, contests, questions }}>
			{children}
		</AppContext.Provider>
	);
};

const useGlobalContext = () => {
	return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalContext };
