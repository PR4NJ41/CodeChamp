import { BrowserRouter, Route, Routes } from "react-router-dom";
import Profile from "./Pages/Profile/profile";
import Questions from "./Pages/Questions/questionsPage";
import Contests from "./Pages/Contests/contestsPage";
import Magic from "./Pages/Magic/magicPage";
import Test from "./Pages/test/test";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Profile />} />
				<Route path="questions" element={<Questions />} />
				<Route path="contests" element={<Contests />} />
				<Route path="magic" element={<Magic />} />
				<Route path="test" element={<Test />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
