import { BrowserRouter, Route, Routes } from "react-router-dom";
import Profile from "./Pages/Profile/profile";
import Questions from "./Pages/Questions/questionsPage";
import Contests from "./Pages/Contests/contestsPage";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Profile />} />
				<Route path="questions" element={<Questions />} />
				<Route path="contests" element={<Contests />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
